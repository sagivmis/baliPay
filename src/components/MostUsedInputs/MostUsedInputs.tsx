import { Button } from "@mui/material"
import React, { useContext } from "react"
import { IUserContext, UserContext } from "../../context/userContext"
import { EditMode } from "../../types"
import "./most-used.css"

const currencyAmounts = [0.05, 0.1, 0.5, 1]
const fiatAmounts = [10, 50, 100, 500]

const MostUsedInputs = () => {
  const { editMode, handleAmountChange, set } = useContext(
    UserContext
  ) as IUserContext
  return (
    <div className='most-used-inputs'>
      {editMode === "currency"
        ? fiatAmounts.map((fiatAmount) => (
            <Button
              onClick={() => {
                handleAmountChange({ amountInDollars: fiatAmount })
                set.fiat(fiatAmount)
              }}
            >
              {`${fiatAmount}$`}
            </Button>
          ))
        : currencyAmounts.map((currencyAmount) => (
            <Button
              onClick={() => {
                handleAmountChange({ currencyAmount })
                set.amount(0.05)
              }}
            >
              {`${currencyAmount}`}
            </Button>
          ))}
    </div>
  )
}

export default MostUsedInputs
