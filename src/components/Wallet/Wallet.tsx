import React, { useCallback, useContext, useEffect, useState } from "react"
import { AvailableTickers, WalletType } from "../../types"
import {
  dummyHistory,
  transactionsGridColumns,
  walletGridColumns,
  WalletTransaction
} from "./cfg"
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid"
import "./wallet.css"
import { ITickerContext, TickerContext } from "../../context/tickersContext"
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList
} from "recharts"
import { formatAmountNumber } from "../../utils"
import { availableBalances } from "../../utils/cfg"
import { useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"

const Wallet = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [wallet, setWallet] = useState<WalletType>({
    balance: { btc: 0.1, eth: 3.88, sol: 113.3, usd: 1000 }
  })
  const [history, setHistory] = useState(dummyHistory)
  const [fiatBalances, setFiatBalances] = useState<WalletType>({
    balance: { btc: 0, eth: 0, sol: 0, usd: 0 }
  })
  const [totalWalletBalance, setTotalWalletBalance] = useState(0)

  const { btcPrice, ethPrice, solPrice } = useContext(
    TickerContext
  ) as ITickerContext

  const [miniWalletData, setMiniWalletData] = useState<
    {
      id: number
      amount: number
      asset: string
      fiat: number
    }[]
  >([])

  const generateMiniWalletData = useCallback(() => {
    setMiniWalletData(
      Object.values(wallet.balance).map((amount, index) => {
        return {
          id: index,
          amount,
          asset: Object.keys(wallet.balance)[index].toUpperCase(),
          fiat: Object.values(fiatBalances.balance)[index]
        }
      })
    )
  }, [fiatBalances.balance, wallet.balance])

  useEffect(() => {
    generateMiniWalletData()
  }, [generateMiniWalletData])

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
    ({ payload, active, label, ...props }: any) => {
      const bal = Object.values(fiatBalances.balance).map((balance, index) => {
        return { balance, index }
      })
      let key = 0
      bal.forEach((balance) => {
        // ! TO FIX
        // ! will be a problem when balances are the same with floor func
        // ! i.e btc fiat value: 2222.33$ and eth fiat value: 2222.71$
        // ! might cause wrong string to be written to screen
        if (
          Math.floor(balance.balance) ===
          Math.floor(parseFloat(payload[0]?.value))
        )
          key = balance.index
      })
      const keys = Object.keys(fiatBalances.balance)

      return (
        <div className='tooltip'>
          <p className='label'>
            {`~${payload[0]?.value}$  (${keys[key].toUpperCase()})`}
          </p>
        </div>
      )
    },
    [fiatBalances.balance]
  )

  useEffect(() => {
    setFiatBalances(() => {
      const fiatWallet: WalletType = {
        balance: { btc: 0, eth: 0, sol: 0, usd: 0 }
      }
      let totalValue = 0
      setTotalWalletBalance(() => {
        Object.keys(wallet.balance).map((key) => {
          if (key === "btc") {
            const newVal = formatAmountNumber(
              (parseFloat(btcPrice) * wallet.balance[key]).toString()
            )
            fiatWallet.balance.btc = newVal
            totalValue += newVal
            return fiatWallet.balance.btc
          }
          if (key === "eth") {
            fiatWallet.balance.eth = formatAmountNumber(
              (parseFloat(ethPrice) * wallet.balance[key]).toString()
            )
            totalValue += fiatWallet.balance.eth
            return fiatWallet.balance.eth
          }
          if (key === "sol") {
            fiatWallet.balance.sol = formatAmountNumber(
              (parseFloat(solPrice) * wallet.balance[key]).toString()
            )
            totalValue += fiatWallet.balance.sol
            return fiatWallet.balance.sol
          }
          if (key === "usd") {
            fiatWallet.balance.usd = formatAmountNumber(
              wallet.balance[key].toString()
            )
            totalValue += fiatWallet.balance.usd
            return fiatWallet.balance.usd
          }
        })
        return totalValue
      })

      return fiatWallet
    })
  }, [btcPrice, ethPrice, solPrice, wallet])

  useEffect(() => {
    availableBalances.forEach((ticker) => {
      if (ticker === "BTC") {
        setWallet((prevWallet) => {
          return {
            balance: {
              ...prevWallet.balance,
              btc: calculateCurrencyAmountFromHistory(ticker)
            }
          }
        })
        return {
          btc: calculateCurrencyAmountFromHistory(ticker)
        }
      }
      if (ticker === "ETH") {
        setWallet((prevWallet) => {
          return {
            balance: {
              ...prevWallet.balance,
              eth: calculateCurrencyAmountFromHistory(ticker)
            }
          }
        })
        return {
          eth: calculateCurrencyAmountFromHistory(ticker)
        }
      }
      if (ticker === "SOL") {
        setWallet((prevWallet) => {
          return {
            balance: {
              ...prevWallet.balance,
              sol: calculateCurrencyAmountFromHistory(ticker)
            }
          }
        })
        return {
          sol: calculateCurrencyAmountFromHistory(ticker)
        }
      }
      if (ticker === "USD") {
        setWallet((prevWallet) => {
          return {
            balance: {
              ...prevWallet.balance,
              usd: calculateCurrencyAmountFromHistory(ticker)
            }
          }
        })
        return {
          usd: calculateCurrencyAmountFromHistory(ticker)
        }
      }

      return null
    })
  }, [calculateCurrencyAmountFromHistory])

  const [showPieLabel, setShowPieLabel] = useState(true)
  const [pieData, setPieData] = useState(
    Object.values(fiatBalances.balance).map((balance) => {
      return { balance }
    })
  )
  const [inWalletPage, setInWalletPage] = useState(false)

  const [walletClass, setWalletClass] = useState("wallet-container")

  useEffect(() => {
    if (location.pathname === "/wallet") {
      setInWalletPage(true)
      setWalletClass("wallet-container")
    } else {
      setInWalletPage(false)
      setWalletClass("wallet-container-mini")
    }
  }, [location.pathname])

  useEffect(() => {
    console.log(miniWalletData)
  }, [miniWalletData])

  useEffect(() => {
    setPieData(
      Object.values(fiatBalances.balance).map((balance, index) => {
        return {
          balance,
          ticker: Object.keys(fiatBalances.balance)[index].toUpperCase()
        }
      })
    )
  }, [fiatBalances.balance])

  return (
    <div className={walletClass}>
      <div className='wallet-header'>
        <h2
          className={clsx(
            "greeting-label",
            inWalletPage ? "" : "mini-greeting-label"
          )}
        >
          Welcome Sagiv Mishaan
        </h2>
        <h4
          className={clsx(
            "greeting-label",
            inWalletPage ? "estimated-label" : "mini-estimated-label"
          )}
        >
          {`Estimated balance ~ ${totalWalletBalance.toFixed(2)}$`}
        </h4>
      </div>
      <div
        className={clsx(
          "assets-container",
          !inWalletPage ? "assets-container-mini" : ""
        )}
      >
        <h3 className='assets-label'>Assets</h3>
        {inWalletPage && (
          <ResponsiveContainer width='30%' height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey='balance'
                cx='50%'
                cy='50%'
                paddingAngle={5}
                innerRadius={80}
                outerRadius={100}
                isAnimationActive={false}
                fill='#8884d8'
                label={showPieLabel}
                // minAngle={1000}
              >
                <LabelList dataKey='ticker' position='insideStart' />
              </Pie>
              <Tooltip content={renderCustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        )}
        {!inWalletPage && (
          <DataGrid
            rows={miniWalletData}
            columns={walletGridColumns}
            className='mini-wallet-asset-grid'
            pageSize={5}
          />
        )}
      </div>
      {inWalletPage && (
        <div className='history-container'>
          <h3 className='history-label'>History</h3>
          <DataGrid
            rows={history}
            columns={transactionsGridColumns}
            className='wallet-history-grid'
            pageSize={5}
            checkboxSelection
          />
        </div>
      )}
    </div>
  )
}

export default Wallet
