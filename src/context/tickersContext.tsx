import React, { useCallback, useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { TickerReturn } from "../types"
import { getAllTickers, getBothMainTickers } from "../utils"

export interface ITickerContext {
  btcPrice: string
  ethPrice: string
  solPrice: string
  current: string
  tickers: TickerReturn[]
  set: {
    eth: Dispatch<SetStateAction<string>>
    btc: Dispatch<SetStateAction<string>>
    sol: Dispatch<SetStateAction<string>>
    current: Dispatch<SetStateAction<string>>
    tickers: Dispatch<SetStateAction<TickerReturn[]>>
  }
}

const defaultTickersContext: ITickerContext = {
  btcPrice: "",
  ethPrice: "",
  solPrice: "",
  current: "",
  tickers: [],
  set: {
    eth: () => "",
    sol: () => "",
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
  const [solPrice, setSolPrice] = useState("")
  const [currentTickerPrice, setCurrentTickerPrice] = useState(ethPrice)
  const [tickers, setTickers] = useState<TickerReturn[]>([])

  const handleFetchAndSetTickers = useCallback(async () => {
    const tickers = await getAllTickers().then((res) => {
      setTickers(res.data)
      return res.data
    })
    if (tickers[0].symbol === "BTCUSDT") {
      setBtcPrice(tickers[0].price)
      setEthPrice(tickers[1].price)
      setSolPrice(tickers[2].price)
    } else {
      setEthPrice(tickers[0].price)
      setBtcPrice(tickers[1].price)
      setSolPrice(tickers[2].price)
    }
  }, [])

  useEffect(() => {
    handleFetchAndSetTickers()
    const interval = setInterval(handleFetchAndSetTickers, 2000)
    return () => clearInterval(interval)
  }, [handleFetchAndSetTickers])

  return (
    <TickerContext.Provider
      value={{
        ethPrice,
        btcPrice,
        solPrice,
        current: currentTickerPrice,
        tickers,
        set: {
          eth: setEthPrice,
          btc: setBtcPrice,
          sol: setSolPrice,
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
