import { Button } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import PaymentOptions from "../PaymentOptions/PaymentOptions"
import TickerChoice from "../TickerChoice/TickerChoice"
import UserInput from "../UserInput"
import "./buy.css"

const Buy = () => {
  const [gasFee, setGasFee] = useState(10)
  const [platformFee, setPlatformFee] = useState(0)
  const [platformRate, setPlatformRate] = useState(5)
  const [totalPrice, setTotalPrice] = useState(0)
  const { fiatAmount } = useContext(UserContext)

  useEffect(() => {
    setTotalPrice(fiatAmount + gasFee + (fiatAmount * platformRate) / 100)
  }, [fiatAmount, gasFee, platformRate])

  useEffect(() => {
    setPlatformFee(fiatAmount * (platformRate / 100))
  }, [fiatAmount, platformRate, totalPrice])

  return (
    <div className='buy-container'>
      <PaymentOptions />
      <div className='buy'>
        <TickerChoice />
        <UserInput />
        <div className='gas-fee-container'>
          <p className='mini-flex-line-info'>Gas:</p>
          <p className='gas-fee'>{`${gasFee}$`}</p>
        </div>
        <div className='platform-fee-container'>
          <p className='mini-flex-line-info'>Handling fee:</p>
          <p className='platform-fee'>{`${
            (fiatAmount * platformRate) / 100
          }$`}</p>
        </div>
        <div className='total-price'>{`${fiatAmount ? totalPrice : 0}$`}</div>
        <div className='buy-container-footer'>
          <Button className='buy-btn'>BUY</Button>
        </div>
      </div>
    </div>
  )
}

export default Buy
