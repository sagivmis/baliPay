import React, { useEffect, useState } from "react"
import "./Bali.css"
import TickerPrices from "../TickerPrices"
import HomeIcon from "@mui/icons-material/Home"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Buy from "../Buy/Buy"
import Home from "../Home"
import Wallet from "../Wallet"

function Bali() {
  const { BINACE_API_SECRET, BINANCE_API_KEY } = process.env
  const location = useLocation()
  const navigate = useNavigate()
  const [homeIconClass, setHomeIconClass] = useState("navigate-home-container")
  const [inWalletPage, setInWalletPage] = useState(false)
  const [sideWalletClass, setSideWalletClass] = useState("side-wallet")

  function handleClickHome() {
    navigate("/")
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setHomeIconClass("navigate-home-container none-home-icon")
    } else {
      setHomeIconClass("navigate-home-container")
    }
    if (location.pathname === "/wallet") {
      setInWalletPage(true)
      setSideWalletClass("side-wallet hidden-wallet")
    } else {
      setInWalletPage(false)
      setSideWalletClass("side-wallet")
    }
  }, [location.pathname])

  return (
    <div className='user-interface'>
      <TickerPrices />
      <div className='bali'>
        <div className={homeIconClass}>
          <HomeIcon className='home-icon' onClick={handleClickHome} />
        </div>
        <div className={sideWalletClass}>
          <Wallet />
        </div>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/buy' element={<Buy />}></Route>
          <Route path='/wallet' element={<Wallet />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Bali
