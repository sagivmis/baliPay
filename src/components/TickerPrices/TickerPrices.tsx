import React from "react"
import { ITickerContext, TickerContext } from "../../context/tickersContext"
import { formatAmountNumber } from "../../utils"
import "./ticker-prices.css"

const TickerPrices = () => {
  const { btcPrice, ethPrice } = React.useContext(
    TickerContext
  ) as ITickerContext
  return (
    <div className='ticker-prices'>
      <b>BTC:</b> {`${formatAmountNumber(btcPrice)}$`} <b>ETH:</b>
      {`${formatAmountNumber(ethPrice)}$`}
    </div>
  )
}

export default TickerPrices
