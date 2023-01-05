import React, { useContext, useState } from "react"
import { ITickerContext, TickerContext } from "../../context/tickersContext"
import { IUserContext, UserContext } from "../../context/userContext"
import Input from "@mui/material/Input"
import { InputAdornment } from "@mui/material"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import EditIcon from "@mui/icons-material/Edit"
import "./user-input.css"
import MostUsedInputs from "../MostUsedInputs"
import { formatAmountNumber } from "../../utils"
const UserInput = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const { current } = useContext(TickerContext) as ITickerContext
  const {
    amount,
    fiatAmount,
    editMode,
    set,
    decrementAmount,
    decrementFiatAmount,
    incrementAmount,
    incrementFiatAmount
  } = useContext(UserContext) as IUserContext
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      parseInt(e.target.value) ||
      parseInt(e.target.value) === 0 ||
      e.target.value === ""
    ) {
      set.amount(parseFloat(e.target.value))
      setErrorMessage("")
    } else setErrorMessage("Please enter numbers only")
  }
  const handleFiatAmountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      parseInt(e.target.value) ||
      parseInt(e.target.value) === 0 ||
      e.target.value === ""
    ) {
      set.fiat(parseFloat(e.target.value))
      setErrorMessage("")
    } else setErrorMessage("Please enter numbers only")
  }

  const handleShowEdit = () => {
    setShowEdit(true)
  }
  const handleHideEdit = () => {
    setShowEdit(false)
  }
  return (
    <div className='input-container'>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <MostUsedInputs />
      <div className='amount-user-input'>
        <p className='mini-flex-line-info'>Amount:</p>
        {editMode === "currency" && (
          <p
            className='amount-in-dollar mini-flex-line-info'
            onMouseOver={handleShowEdit}
            onMouseLeave={handleHideEdit}
          >
            {showEdit && (
              <EditIcon
                className='edit-icon'
                onClick={() => {
                  set.editMode("fiat")
                }}
              />
            )}
            {`${formatAmountNumber(fiatAmount.toString(), true)}$`}
          </p>
        )}
        {editMode === "fiat" && (
          <Input
            onChange={handleFiatAmountInputChange}
            value={fiatAmount}
            className='input'
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*"
            }}
            startAdornment={
              <InputAdornment position='start' className='control-amount'>
                <AddIcon onClick={incrementFiatAmount} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position='start' className='control-amount'>
                <RemoveIcon onClick={decrementFiatAmount} />
              </InputAdornment>
            }
          />
        )}
        {editMode === "currency" && (
          <Input
            onChange={handleAmountInputChange}
            value={amount}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*"
            }}
            startAdornment={
              <InputAdornment position='start' className='control-amount'>
                <AddIcon onClick={incrementAmount} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position='start' className='control-amount'>
                <RemoveIcon onClick={decrementAmount} />
              </InputAdornment>
            }
          />
        )}
        {editMode === "fiat" && (
          <p
            className='amount-in-dollar mini-flex-line-info'
            onMouseOver={handleShowEdit}
            onMouseLeave={handleHideEdit}
          >
            {showEdit && (
              <EditIcon
                className='edit-icon'
                onClick={() => {
                  set.editMode("currency")
                }}
              />
            )}
            {amount}
          </p>
        )}
      </div>
    </div>
  )
}

export default UserInput
