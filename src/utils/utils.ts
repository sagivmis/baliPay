import axios from "axios"
const baseUrl = "https://api.binance.com"

const getAllPrices = async () => {
  return await axios.get(`${baseUrl}/api/v3/ticker/price`)
}

const getBTCTicker = async () => {
  return await axios.get(`${baseUrl}/api/v3/ticker/price?symbol="BTCUSDT`)
}

const getETHTicker = async () => {
  return await axios.get(`${baseUrl}/api/v3/ticker/price?symbol="ETHUSDT`)
}
export type TickerReturn = {
  symbol: string
  price: string
}
const getBothMainTickers = async () => {
  const res = await axios.get<TickerReturn[]>(
    `${baseUrl}/api/v3/ticker/price?symbols=["ETHUSDT","BTCUSDT"]`
  )
  return res
}
type OrderSideType = "SELL" | "BUY"
type OrderType =
  | "LIMIT"
  | "MARKET"
  | "STOP_LOSS"
  | "STOP_LOSS_LIMIT"
  | "TAKE_PROFIT"
  | "TAKE_PROFIT_LIMIT"
  | "LIMIT_MAKER"

const placeNewOrder = async (
  symbol: string,
  side: OrderSideType,
  type: OrderType,
  quantity: number,
  timestamp: number,
  price?: number,
  stopPrice?: number
) => {
  const res = await axios.post(
    `${baseUrl}/api/v3/order$symbol="${symbol}"&side="${side}"&type="${type}"&quantity="${quantity}"&timestamp="${timestamp}`
  )
  return res
}
export {
  baseUrl as binanceApiUrl,
  getAllPrices,
  getBTCTicker,
  getETHTicker,
  getBothMainTickers,
  placeNewOrder
}
