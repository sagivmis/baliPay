export type TickerReturn = {
  symbol: string
  price: string
}
export type TickerChoice = "ETH" | "BTC"
export type PaymentMethod = "PAYPAL" | "MASTERCARD" | "VISA" | "BIT"
export type EditMode = "currency" | "fiat"
export type PaymentOptionType = {
  logo: string
  paymentMethod: PaymentMethod
}
