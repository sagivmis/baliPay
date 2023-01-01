import React, { useCallback, useEffect, useState } from "react"
import Input from "@mui/material/Input"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import EditIcon from "@mui/icons-material/Edit"
import clsx from "clsx"
import "./Bali.css"
import {
  InputAdornment,
  MenuItem,
  Radio,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { getBothMainTickers, TickerReturn } from "../../utils/utils"
import { BitLogo, MCLogo, PaypalLogo, VisaLogo } from "../../resources"

const currencyAmounts = [0.05, 0.1, 0.5, 1]
const fiatAmounts = [10, 50, 100, 500]
type TickerChoice = "ETH" | "BTC"
type PaymentMethod = "PAYPAL" | "MASTERCARD" | "VISA" | "BIT"

function Bali() {
  const { BINACE_API_SECRET, BINANCE_API_KEY } = process.env
  const [amount, setAmount] = useState(0)
  const [fiatAmount, setFiatAmount] = useState(0)
  const [ethPrice, setEthPrice] = useState("")
  const [btcPrice, setBtcPrice] = useState("")
  const [editMode, setEditMode] = useState<"currency" | "fiat">("currency")
  const [choice, setChoice] = useState<TickerChoice>("ETH")
  const [tickers, setTickers] = useState<TickerReturn[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const [currentTickerPrice, setCurrentTickerPrice] = useState(ethPrice)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("VISA")

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      parseInt(e.target.value) ||
      parseInt(e.target.value) === 0 ||
      e.target.value === ""
    ) {
      setAmount(parseFloat(e.target.value))
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
      setFiatAmount(parseFloat(e.target.value))
      setErrorMessage("")
    } else setErrorMessage("Please enter numbers only")
  }

  const incrementAmount = () => {
    setAmount((prevAmount) => parseFloat((prevAmount + 0.1).toFixed(3)))
  }

  const decrementAmount = () => {
    setAmount((prevAmount) => parseFloat((prevAmount - 0.1).toFixed(3)))
  }
  const incrementFiatAmount = () => {
    setFiatAmount((prevAmount) => parseFloat((prevAmount + 1).toFixed(3)))
  }

  const decrementFiatAmount = () => {
    setFiatAmount((prevAmount) => parseFloat((prevAmount - 1).toFixed(3)))
  }

  const handleFetchAndSetTickers = async () => {
    const tickers = await getBothMainTickers().then((res) => {
      setTickers(res.data)
      return res.data
    })
    if (tickers[0].symbol === "BTCUSDT") {
      setBtcPrice(tickers[0].price)
      setEthPrice(tickers[1].price)
    } else {
      setEthPrice(tickers[0].price)
      setBtcPrice(tickers[1].price)
    }
  }

  const calculateCurrency = useCallback(
    (amountInDollars: number) => {
      return amountInDollars / parseFloat(currentTickerPrice)
    },
    [currentTickerPrice]
  )

  const formatAmountNumber = (amount: string) =>
    parseFloat(parseFloat(amount).toFixed(3))
  const formatAmountString = (amount: string) => parseFloat(amount).toFixed(3)

  const handleAmountChange = useCallback(
    ({
      amountInDollars,
      currencyAmount
    }: {
      amountInDollars?: number
      currencyAmount?: number
    }) => {
      if (amountInDollars)
        setAmount(
          formatAmountNumber(calculateCurrency(amountInDollars).toString())
        )
      if (currencyAmount)
        setFiatAmount(
          Math.floor(formatAmountNumber(currentTickerPrice) * currencyAmount)
        )
    },
    [calculateCurrency, currentTickerPrice]
  )

  useEffect(() => {
    handleFetchAndSetTickers()
    const interval = setInterval(handleFetchAndSetTickers, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (choice === "BTC") setCurrentTickerPrice(btcPrice)
    if (choice === "ETH") setCurrentTickerPrice(ethPrice)
  }, [btcPrice, choice, ethPrice])

  const handleShowEdit = () => {
    setShowEdit(true)
  }
  const handleHideEdit = () => {
    setShowEdit(false)
  }
  useEffect(() => {
    if (editMode === "currency")
      handleAmountChange({
        currencyAmount: formatAmountNumber(currentTickerPrice) * amount
      })
  }, [amount, currentTickerPrice, editMode, handleAmountChange])

  useEffect(() => {
    if (editMode === "fiat") handleAmountChange({ amountInDollars: fiatAmount })
  }, [editMode, fiatAmount, handleAmountChange])

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(e.target.value as TickerChoice)
  }

  const [showTickerChoice, setShowTickerChoice] = useState(false)

  const handleShowTickerChoice = () => {
    setShowTickerChoice(true)
  }

  const handleHideTickerChoice = () => {
    setShowTickerChoice(false)
  }

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
  }

  return (
    <div className='user-interface'>
      <div className='ticker-prices'>
        <b>BTC:</b> {`${formatAmountNumber(btcPrice)}$`} <b>ETH:</b>
        {`${formatAmountNumber(ethPrice)}$`}
      </div>
      <div className='bali'>
        <div className='buy-container'>
          <div className='payment-options'>
            <div
              className={clsx({
                "payment-option": true,
                selected: selectedPaymentMethod === "PAYPAL"
              })}
              onClick={() => handlePaymentMethodChange("PAYPAL")}
            >
              <img
                src={PaypalLogo}
                alt='paypal'
                className={clsx({ "payment-option-logo": true })}
              />
            </div>
            <div
              className={clsx({
                "payment-option": true,
                selected: selectedPaymentMethod === "BIT"
              })}
              onClick={() => handlePaymentMethodChange("BIT")}
            >
              <img
                src={BitLogo}
                alt='paypal'
                className={clsx({ "payment-option-logo": true })}
              />
            </div>
            <div
              className={clsx({
                "payment-option": true,
                selected: selectedPaymentMethod === "MASTERCARD"
              })}
              onClick={() => handlePaymentMethodChange("MASTERCARD")}
            >
              <img
                src={MCLogo}
                alt='paypal'
                className={clsx({ "payment-option-logo": true })}
              />
            </div>
            <div
              className={clsx({
                "payment-option": true,
                selected: selectedPaymentMethod === "VISA"
              })}
              onClick={() => handlePaymentMethodChange("VISA")}
            >
              <img
                src={VisaLogo}
                alt='paypal'
                className={clsx({
                  "payment-option-logo": true
                })}
              />
            </div>
          </div>
          <div className='buy'>
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
            <div className='input-container'>
              {errorMessage && (
                <div className='error-message'>{errorMessage}</div>
              )}
              {editMode === "currency" && (
                <div className='most-used-inputs'>
                  {fiatAmounts.map((fiatAmount) => (
                    <Button
                      onClick={() => {
                        handleAmountChange({ amountInDollars: fiatAmount })
                        setFiatAmount(fiatAmount)
                      }}
                    >
                      {`${fiatAmount}$`}
                    </Button>
                  ))}
                </div>
              )}
              {editMode === "fiat" && (
                <div className='most-used-inputs-fiat'>
                  {currencyAmounts.map((currencyAmount) => (
                    <Button
                      onClick={() => {
                        handleAmountChange({ currencyAmount })
                        setAmount(0.05)
                      }}
                    >
                      {`${currencyAmount}`}
                    </Button>
                  ))}
                </div>
              )}
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
                          setEditMode("fiat")
                        }}
                      />
                    )}
                    {`${Math.ceil(amount * parseFloat(currentTickerPrice))}$`}
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
                      <InputAdornment
                        position='start'
                        className='control-amount'
                      >
                        <AddIcon onClick={incrementFiatAmount} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment
                        position='start'
                        className='control-amount'
                      >
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
                      <InputAdornment
                        position='start'
                        className='control-amount'
                      >
                        <AddIcon onClick={incrementAmount} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment
                        position='start'
                        className='control-amount'
                      >
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
                          setEditMode("currency")
                        }}
                      />
                    )}
                    {amount}
                  </p>
                )}
              </div>
            </div>
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
