import React, { useCallback, useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { TickerReturn } from "../types"
import { getBothMainTickers } from "../utils"

export interface ITickerContext {
  btcPrice: string
  ethPrice: string
  current: string
  tickers: TickerReturn[]
  set: {
    eth: Dispatch<SetStateAction<string>>
    btc: Dispatch<SetStateAction<string>>
    current: Dispatch<SetStateAction<string>>
    tickers: Dispatch<SetStateAction<TickerReturn[]>>
  }
}

const defaultTickersContext: ITickerContext = {
  btcPrice: "",
  ethPrice: "",
  current: "",
  tickers: [],
  set: {
    eth: () => "",
    btc: () => "",
    current: () => "",
    tickers: () => []
  }
}

export const TickerContext = React.createContext<ITickerContext>(
  defaultTickersContext
)

const TickersProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [ethPrice, setEthPrice] = useState("")
  const [btcPrice, setBtcPrice] = useState("")
  const [currentTickerPrice, setCurrentTickerPrice] = useState(ethPrice)
  const [tickers, setTickers] = useState<TickerReturn[]>([])

  const handleFetchAndSetTickers = useCallback(async () => {
    const tickers = await getBothMainTickers().then((res) => {
      setTickers(res.data)
      return res.data
    })
    if (tickers[0].symbol === "BTCUSDT") {
      setBtcPrice(tickers[0].price)
      setEthPrice(tickers[1].price)
    } else {
      setEthPrice(tickers[0].price)
      setBtcPrice(tickers[1].price)
    }
  }, [])

  useEffect(() => {
    handleFetchAndSetTickers()
    const interval = setInterval(handleFetchAndSetTickers, 5000)
    return () => clearInterval(interval)
  }, [handleFetchAndSetTickers])

  return (
    <TickerContext.Provider
      value={{
        ethPrice,
        btcPrice,
        current: currentTickerPrice,
        tickers,
        set: {
          eth: setEthPrice,
          btc: setBtcPrice,
          current: setCurrentTickerPrice,
          tickers: setTickers
        }
      }}
    >
      {children}
    </TickerContext.Provider>
  )
}

export default TickersProvider
