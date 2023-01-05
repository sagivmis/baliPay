import { OrderSideType } from "../../utils/types"
import { GridColDef } from "@mui/x-data-grid"

type WalletTransaction = {
  id: number
  date?: Date
  side: OrderSideType
  currency: "FIAT" | "ETH" | "BTC"
  amount: number
  price: number // price for token
  totalPrice: number
}

type WalletAction = "DEPOSIT" | "WITHDRAW" | "BUY" | "SELL"

export const dummyHistory: WalletTransaction[] = [
  {
    id: 0,
    side: "BUY",
    currency: "ETH",
    amount: 1,
    price: 1123,
    totalPrice: 1123
  },
  {
    id: 1,
    side: "BUY",
    currency: "ETH",
    amount: 0.16,
    price: 1123,
    totalPrice: 112.3
  },
  {
    id: 2,
    side: "BUY",
    currency: "ETH",
    amount: 0.5,
    price: 1200,
    totalPrice: 600
  },
  {
    id: 3,
    side: "SELL",
    currency: "ETH",
    amount: 1.503,
    price: 1500,
    totalPrice: 2250
  },
  {
    id: 4,
    side: "SELL",
    currency: "ETH",
    amount: 0.1132,
    price: 1400,
    totalPrice: 140
  },
  {
    id: 5,
    side: "BUY",
    currency: "ETH",
    amount: 0.5555,
    price: 1300,
    totalPrice: 650
  },
  {
    id: 6,
    side: "BUY",
    currency: "ETH",
    amount: 0.5123,
    price: 1200,
    totalPrice: 600
  },
  {
    id: 7,
    side: "BUY",
    currency: "ETH",
    amount: 1,
    price: 1200,
    totalPrice: 1200
  },
  {
    id: 8,
    side: "SELL",
    currency: "ETH",
    amount: 0.21,
    price: 1200,
    totalPrice: 240
  }
]

export const gridColumns: GridColDef[] = [
  { field: "date", headerName: "Time", flex: 3 },
  { field: "side", headerName: "Action", flex: 1 },
  { field: "currency", headerName: "Asset", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 4 },
  { field: "price", headerName: "$/Token", flex: 4 },
  { field: "totalPrice", headerName: "Total $", flex: 4 }
]
