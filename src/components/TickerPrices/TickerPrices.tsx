import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import { ITickerContext, TickerContext } from "../../context/tickersContext"
import { formatAmountNumber } from "../../utils"
import { availableTickers } from "../../utils/cfg"
import "./ticker-prices.css"

type CoinChangeType = "neutral" | "down" | "up"
const TickerPrices = () => {
  const { btcPrice, ethPrice, solPrice } = useContext(
    TickerContext
  ) as ITickerContext
  const [prevPrices, setPrevPrices] = useState({ btcPrice, ethPrice, solPrice })
  //   const [prices, setPrices] = useState
  const [ethClass, setEthClass] = useState<CoinChangeType>("neutral")
  const [btcClass, setBtcClass] = useState<CoinChangeType>("neutral")
  const [solClass, setSolClass] = useState<CoinChangeType>("neutral")

  const updateTickerClass = (
    price: number,
    prevPrice: number,
    setTickerClass: Dispatch<SetStateAction<CoinChangeType>>
  ) => {
    if (price < prevPrice) setTickerClass("down")
    else if (price > prevPrice) setTickerClass("up")
    else if (price === prevPrice) setTickerClass("neutral")
  }

  useEffect(() => {
    setPrevPrices((prevPrices) => {
      updateTickerClass(
        parseFloat(btcPrice),
        parseFloat(prevPrices.btcPrice),
        setBtcClass
      )
      updateTickerClass(
        parseFloat(solPrice),
        parseFloat(prevPrices.solPrice),
        setSolClass
      )
      updateTickerClass(
        parseFloat(ethPrice),
        parseFloat(prevPrices.ethPrice),
        setEthClass
      )

      return { btcPrice, ethPrice, solPrice }
    })
  }, [btcPrice, ethPrice, solPrice])

  return (
    <div className='ticker-prices'>
      <div className={btcClass}>
        <b>BTC:&nbsp;</b> <p>{`${formatAmountNumber(btcPrice)}$`}</p>
      </div>
      <div className={ethClass}>
        <b>ETH:&nbsp;</b> <p>{`${formatAmountNumber(ethPrice)}$`}</p>
      </div>
      <div className={solClass}>
        <b>SOL:&nbsp;</b> <p>{`${formatAmountNumber(solPrice)}$`}</p>
      </div>
    </div>
  )
}

export default TickerPrices
