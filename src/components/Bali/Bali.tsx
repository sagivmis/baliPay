import React, { useState } from "react"
import Button from "@mui/material/Button"
import "./Bali.css"
import TickerPrices from "../TickerPrices"
import PaymentOptions from "../PaymentOptions/PaymentOptions"
import TickerChoice from "../TickerChoice/TickerChoice"
import UserInput from "../UserInput"

function Bali() {
  const { BINACE_API_SECRET, BINANCE_API_KEY } = process.env

  return (
    <div className='user-interface'>
      <TickerPrices />
      <div className='bali'>
        <div className='buy-container'>
          <PaymentOptions />
          <div className='buy'>
            <TickerChoice />
            <UserInput />
            <div className='buy-container-footer'>
              <Button className='buy-btn'>BUY</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bali
