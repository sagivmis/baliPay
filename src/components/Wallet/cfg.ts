import { GridColDef } from "@mui/x-data-grid"
import { AccountBalance, AvailableTickers } from "../../types"

export type WalletTransaction = {
  id: number
  date?: Date
  side: WalletAction
  currency: AvailableTickers
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
  },
  {
    id: 9,
    side: "DEPOSIT",
    currency: "USD",
    amount: 2000,
    price: 1,
    totalPrice: 2000
  },
  {
    id: 10,
    side: "DEPOSIT",
    currency: "ETH",
    amount: 0.5,
    price: 1200,
    totalPrice: 600
  },
  {
    id: 11,
    side: "BUY",
    currency: "SOL",
    amount: 100,
    price: 10,
    totalPrice: 1000
  },
  {
    id: 11,
    side: "BUY",
    currency: "BTC",
    amount: 0.1,
    price: 15000,
    totalPrice: 1500
  }
]

export const exampleBalanceHistory: AccountBalance[] = [
  {
    id: 0,
    balance: 0,
    assets: { btc: 0, eth: 0, sol: 0, usd: 0 }
  },
  {
    id: 1,
    balance: 0,
    assets: { btc: 0, eth: 0, sol: 0, usd: 0 }
  },
  {
    id: 2,
    balance: 0,
    assets: { btc: 0, eth: 0, sol: 0, usd: 0 }
  },
  {
    id: 3,
    balance: 0,
    assets: { btc: 0, eth: 0, sol: 0, usd: 0 }
  },
  {
    id: 4,
    balance: 3000,
    assets: { btc: 0, eth: 0, sol: 0, usd: 3000 }
  },
  {
    id: 5,
    balance: 3600,
    assets: { btc: 0, eth: 3, sol: 0, usd: 0 }
  },
  {
    id: 6,
    balance: 4500,
    assets: { btc: 0, eth: 3, sol: 0, usd: 0 }
  },
  {
    id: 7,
    balance: 3900,
    assets: { btc: 0, eth: 3, sol: 0, usd: 0 }
  },
  {
    id: 8,
    balance: 3900,
    assets: { btc: 0, eth: 0, sol: 0, usd: 3900 }
  },
  {
    id: 9,
    balance: 4800,
    assets: { btc: 0.4, eth: 0, sol: 0, usd: 0 }
  }
]

export const transactionsGridColumns: GridColDef[] = [
  { field: "date", headerName: "Time", flex: 3 },
  { field: "side", headerName: "Action", flex: 1 },
  { field: "currency", headerName: "Asset", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 4 },
  { field: "price", headerName: "$/Token", flex: 4 },
  { field: "totalPrice", headerName: "Total $", flex: 4 }
]

export const walletGridColumns: GridColDef[] = [
  { field: "asset", headerName: "Asset", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "fiat", headerName: "~$", flex: 1 }
]
