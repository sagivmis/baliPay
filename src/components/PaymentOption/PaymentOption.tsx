import clsx from "clsx"
import React from "react"
import { IUserContext, UserContext } from "../../context/userContext"
import { PaymentOptionType } from "../../types"
import "./payment-option.css"

const PaymentOption = (props: PaymentOptionType) => {
  const { logo, paymentMethod } = props
  const { selectedPaymentMethod, handlePaymentMethodChange } = React.useContext(
    UserContext
  ) as IUserContext
  return (
    <div
      className={clsx({
        "payment-option": true,
        selected: selectedPaymentMethod === paymentMethod
      })}
      onClick={() => handlePaymentMethodChange(paymentMethod)}
    >
      <img
        src={logo}
        alt={paymentMethod}
        className={clsx({ "payment-option-logo": true })}
      />
    </div>
  )
}

export default PaymentOption
