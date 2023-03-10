import React, { useCallback, useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { EditMode, PaymentMethod, AvailableTickers } from "../types"
import { formatAmountNumber } from "../utils"
import { ITickerContext, TickerContext } from "./tickersContext"

type OptionalAmount = {
  amountInDollars?: number
  currencyAmount?: number
}

export interface IUserContext {
  amount: number
  fiatAmount: number
  editMode: EditMode
  choice: AvailableTickers
  selectedPaymentMethod: PaymentMethod
  set: {
    amount: Dispatch<SetStateAction<number>>
    fiat: Dispatch<SetStateAction<number>>
    editMode: Dispatch<SetStateAction<EditMode>>
    choice: Dispatch<SetStateAction<AvailableTickers>>
    paymentMethod: Dispatch<SetStateAction<PaymentMethod>>
  }
  handlePaymentMethodChange: (method: PaymentMethod) => void
  handleChoiceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAmountChange: ({
    amountInDollars,
    currencyAmount
  }: OptionalAmount) => void
  incrementFiatAmount: () => void
  decrementFiatAmount: () => void
  incrementAmount: () => void
  decrementAmount: () => void
}

const defaultUserContext: IUserContext = {
  amount: 0,
  fiatAmount: 0,
  editMode: "currency",
  choice: "ETH",
  selectedPaymentMethod: "VISA",
  set: {
    amount: () => "",
    fiat: () => "",
    editMode: () => "",
    choice: () => "",
    paymentMethod: () => ""
  },
  handlePaymentMethodChange: () => {},
  handleChoiceChange: () => {},
  handleAmountChange: () => {},
  incrementFiatAmount: () => {},
  decrementFiatAmount: () => {},
  incrementAmount: () => {},
  decrementAmount: () => {}
}
export const UserContext = React.createContext<IUserContext>(defaultUserContext)

const UserProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [amount, setAmount] = useState(0)
  const [prevAmount, setPrevAmount] = useState(0)
  const [fiatAmount, setFiatAmount] = useState(0)
  const [prevFiatAmount, setPrevFiatAmount] = useState(0)
  const [editMode, setEditMode] = useState<EditMode>("currency")
  const [choice, setChoice] = useState<AvailableTickers>("ETH")
  const [prevChoice, setPrevChoice] = useState<AvailableTickers>("ETH")
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("VISA")
  const { current, set, btcPrice, ethPrice } = React.useContext(
    TickerContext
  ) as ITickerContext
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

  const calculateCurrency = useCallback(
    (amountInDollars: number) => {
      return amountInDollars / parseFloat(current)
    },
    [current]
  )

  const handleAmountChange = useCallback(
    ({ amountInDollars, currencyAmount }: OptionalAmount) => {
      if (amountInDollars || amountInDollars === 0) {
        setAmount(
          formatAmountNumber(calculateCurrency(amountInDollars).toString())
        )
        return
      }
      if (currencyAmount || currencyAmount === 0) {
        setFiatAmount(
          formatAmountNumber(
            (parseFloat(current) * currencyAmount).toString(),
            false,
            true
          )
        )
        return
      }
      console.log("No input {handleAmountChange function}")
    },
    [calculateCurrency, current]
  )

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(e.target.value as AvailableTickers)
  }

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
  }

  useEffect(() => {
    if (choice === "BTC") set.current(btcPrice)
    if (choice === "ETH") set.current(ethPrice)
  }, [btcPrice, choice, ethPrice, set])

  useEffect(() => {
    if (
      choice !== prevChoice ||
      prevAmount !== amount ||
      prevFiatAmount !== fiatAmount
    ) {
      if (editMode === "currency") {
        handleAmountChange({
          currencyAmount: amount
        })
      }
      if (editMode === "fiat") {
        handleAmountChange({ amountInDollars: fiatAmount })
      }
      setPrevChoice(choice)
      setPrevAmount(amount)
      setPrevFiatAmount(fiatAmount)
    }
  }, [
    amount,
    choice,
    current,
    editMode,
    fiatAmount,
    handleAmountChange,
    prevAmount,
    prevChoice,
    prevFiatAmount
  ])

  return (
    <UserContext.Provider
      value={{
        amount,
        fiatAmount,
        editMode,
        choice,
        selectedPaymentMethod,
        set: {
          amount: setAmount,
          fiat: setFiatAmount,
          editMode: setEditMode,
          choice: setChoice,
          paymentMethod: setSelectedPaymentMethod
        },
        handlePaymentMethodChange,
        handleChoiceChange,
        handleAmountChange,
        incrementFiatAmount,
        decrementFiatAmount,
        incrementAmount,
        decrementAmount
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
