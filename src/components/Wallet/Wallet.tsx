import React, { useCallback, useContext, useEffect, useState } from "react"
import { AvailableTickers, WalletType } from "../../types"
import { dummyHistory, gridColumns, WalletTransaction } from "./cfg"
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid"
import "./wallet.css"
import { ITickerContext, TickerContext } from "../../context/tickersContext"
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts"
import { formatAmountNumber } from "../../utils"
import { availableTickers } from "../../utils/cfg"

const Wallet = () => {
  const [wallet, setWallet] = useState<WalletType>({
    balance: { btc: 0.1, eth: 0.88, sol: 113.3, usd: 1000 }
  })
  const [history, setHistory] = useState(dummyHistory)
  const [fiatBalances, setFiatBalances] = useState<WalletType>({
    balance: { btc: 0, eth: 0, sol: 0, usd: 0 }
  })
  const [totalWalletBalance, setTotalWalletBalance] = useState(0)

  const { btcPrice, ethPrice, solPrice } = useContext(
    TickerContext
  ) as ITickerContext

  const calculateCurrencyAmountFromHistory = useCallback(
    (ticker: AvailableTickers) => {
      let totalAmount = 0
      history.forEach((transaction) => {
        if (transaction.currency === ticker) {
          if (transaction.side === "BUY" || transaction.side === "DEPOSIT")
            totalAmount += transaction.amount
          else if (
            transaction.side === "SELL" ||
            transaction.side === "WITHDRAW"
          )
            totalAmount -= transaction.amount
        }
      })
      return totalAmount
      // currencyTransactions.forEach(())
    },
    [history]
  )

  const renderCustomTooltip = useCallback(
    (props: any) => {
      const bal = Object.values(fiatBalances.balance).map((balance, index) => {
        return { balance, index }
      })
      let key = 0
      bal.forEach((balance) => {
        if (balance.balance === parseFloat(props.payload[0]?.value))
          key = balance.index
      })
      const keys = Object.keys(fiatBalances.balance)

      return <div className='tooltip'>{keys[key].toUpperCase()}</div>
    },
    [fiatBalances.balance]
  )

  useEffect(() => {
    setFiatBalances(() => {
      const fiatWallet: WalletType = {
        balance: { btc: 0, eth: 0, sol: 0, usd: 0 }
      }
      setTotalWalletBalance(
        Object.keys(wallet.balance)
          .map((key) => {
            if (key === "btc") {
              fiatWallet.balance.btc = formatAmountNumber(
                (parseFloat(btcPrice) * wallet.balance[key]).toString()
              )
              return fiatWallet.balance.btc
            }
            if (key === "eth") {
              fiatWallet.balance.eth = formatAmountNumber(
                (parseFloat(ethPrice) * wallet.balance[key]).toString()
              )
              return fiatWallet.balance.eth
            }
            if (key === "sol") {
              fiatWallet.balance.sol = formatAmountNumber(
                (parseFloat(solPrice) * wallet.balance[key]).toString()
              )
              return fiatWallet.balance.sol
            }
            if (key === "usd") {
              fiatWallet.balance.usd = formatAmountNumber(
                wallet.balance[key].toString()
              )
              return fiatWallet.balance.usd
            }
          })
          .reduce((accumulator: number, currentValue?: number) => {
            if (currentValue) return accumulator + currentValue
            return 0
          }, 0)
      )

      return fiatWallet
    })
  }, [btcPrice, ethPrice, solPrice, wallet.balance])

  useEffect(() => {
    const newWallet = availableTickers.map((ticker) => {
      if (ticker === "BTC") {
        return { btc: calculateCurrencyAmountFromHistory(ticker) }
      }
      if (ticker === "ETH") {
        return { eth: calculateCurrencyAmountFromHistory(ticker) }
      }
      if (ticker === "SOL") {
        return { sol: calculateCurrencyAmountFromHistory(ticker) }
      }
      if (ticker === "USD") {
        return { usd: calculateCurrencyAmountFromHistory(ticker) }
      }
      return null
    })
    console.log(newWallet)
    // setWallet({balance:{btc:newWallet})
  }, [calculateCurrencyAmountFromHistory])

  const [showPieLabel, setShowPieLabel] = useState(true)
  return (
    <div className='wallet-container'>
      <div className='wallet-header'>
        <h2 className='greeting-label'>Welcome Sagiv Mishaan</h2>
        <h4 className='greeting-label estimated-label'>
          {`Estimated balance ~ ${totalWalletBalance.toFixed(2)}$`}
        </h4>
      </div>
      <div className='assets-container'>
        <h3 className='assets-label'>Assets</h3>
        <ResponsiveContainer width='30%' height={250}>
          <PieChart>
            <Pie
              data={Object.values(fiatBalances.balance).map((balance) => {
                return { balance }
              })}
              dataKey='balance'
              cx='50%'
              cy='50%'
              paddingAngle={5}
              innerRadius={60}
              outerRadius={80}
              isAnimationActive={false}
              fill='#8884d8'
              label={showPieLabel}
            ></Pie>
            <Tooltip content={renderCustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='history-container'>
        <h3 className='history-label'>History</h3>
        <DataGrid
          rows={history}
          columns={gridColumns}
          className='wallet-history-grid'
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default Wallet
