export type TickerReturn = {
  symbol: string
  price: string
}
export type AvailableTickers = "ETH" | "BTC" | "SOL"
export type PaymentMethod = "PAYPAL" | "MASTERCARD" | "VISA" | "BIT"
export type EditMode = "currency" | "fiat"
export type PaymentOptionType = {
  logo: string
  paymentMethod: PaymentMethod
}
export type WalletType = {
  balance: {
    eth: number
    btc: number
    sol: number
    usd: number
  }
}
