import axios from "axios"
import { AvailableTickers, TickerReturn } from "../types"
import { availableTickers } from "./cfg"
import { OrderSideType, OrderType } from "./types"
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

const getBothMainTickers = async () => {
  const res = await axios.get<TickerReturn[]>(
    `${baseUrl}/api/v3/ticker/price?symbols=["ETHUSDT","BTCUSDT"]`
  )
  return res
}

const getAllTickers = async () => {
  const res = await axios.get<TickerReturn[]>(
    `${baseUrl}/api/v3/ticker/price?symbols=[${availableTickers.map(
      (ticker) => `"${ticker}USDT"`
    )}]`
  )
  return res
}

const formatAmountNumber = (
  amount: string,
  ceil?: boolean,
  floor?: boolean
) => {
  if (ceil) return Math.ceil(parseFloat(parseFloat(amount).toFixed(5)))
  if (floor) return Math.floor(parseFloat(parseFloat(amount).toFixed(5)))
  return parseFloat(parseFloat(amount).toFixed(5))
}

const formatAmountString = (amount: string) => parseFloat(amount).toFixed(3)

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
  placeNewOrder,
  formatAmountNumber,
  formatAmountString,
  getAllTickers
}
