import React from "react"
import PaymentOption from "../PaymentOption"
import "./payment-options.css"
import { BitLogo, MCLogo, PaypalLogo, VisaLogo } from "../../resources"
import { PaymentOptionType } from "../../types"

const paymentLogos: PaymentOptionType[] = [
  { logo: BitLogo, paymentMethod: "BIT" },
  { logo: MCLogo, paymentMethod: "MASTERCARD" },
  { logo: PaypalLogo, paymentMethod: "PAYPAL" },
  { logo: VisaLogo, paymentMethod: "VISA" }
]

const PaymentOptions = () => {
  return (
    <div className='payment-options'>
      {paymentLogos.map((payment) => (
        <PaymentOption
          logo={payment.logo}
          paymentMethod={payment.paymentMethod}
        />
      ))}
    </div>
  )
}

export default PaymentOptions
