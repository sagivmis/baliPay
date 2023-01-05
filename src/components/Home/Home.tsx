import { Button } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import "./home.css"

const Home = () => {
  const navigate = useNavigate()

  function handleClickBuy() {
    navigate("/buy")
  }
  function handleClickWallet() {
    navigate("/wallet")
  }
  return (
    <div className='home-page'>
      <div className='greeting'>
        <b>Welcome!</b>
        <p className='greeting-p'>What would you like to do first?</p>
      </div>
      <div className='controls'>
        <Button className='home-control-btn' onClick={handleClickBuy}>
          Buy
        </Button>
        <Button className='home-control-btn'>Withdraw</Button>
        <Button className='home-control-btn' onClick={handleClickWallet}>
          Wallet
        </Button>
      </div>
    </div>
  )
}

export default Home
