import { Radio } from "@mui/material"
import clsx from "clsx"
import React, { useContext, useState } from "react"
import { IUserContext, UserContext } from "../../context/userContext"
import "./ticker-choice.css"
const TickerChoice = () => {
  const { choice, handleChoiceChange } = useContext(UserContext) as IUserContext
  const [showTickerChoice, setShowTickerChoice] = useState(false)

  const handleShowTickerChoice = () => {
    setShowTickerChoice(true)
  }

  const handleHideTickerChoice = () => {
    setShowTickerChoice(false)
  }
  return (
    <div className='ticker-choice-container'>
      <div
        className='ticker-choice-trigger'
        onMouseEnter={handleShowTickerChoice}
        onMouseLeave={handleHideTickerChoice}
      ></div>
      <div
        className={clsx("ticker-choice", showTickerChoice ? "" : "none")}
        onMouseEnter={handleShowTickerChoice}
        onMouseLeave={handleHideTickerChoice}
      >
        <p>{`BTC`}</p>
        <Radio
          checked={choice === "BTC"}
          onChange={handleChoiceChange}
          value='BTC'
        />
        <p>{`ETH`}</p>
        <Radio
          checked={choice === "ETH"}
          onChange={handleChoiceChange}
          value='ETH'
        />
      </div>
    </div>
  )
}

export default TickerChoice
