import React, { useContext, useEffect, useState } from "react"
import { WalletType } from "../../types"
import { dummyHistory, gridColumns } from "./cfg"
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid"
import "./wallet.css"
import { ITickerContext, TickerContext } from "../../context/tickersContext"

const Wallet = () => {
  const [wallet, setWallet] = useState<WalletType>({
    balance: { btc: 0, eth: 5, sol: 500, usd: 100 }
  })
  const [history, setHistory] = useState(dummyHistory)
  const [fiatBalances, setFiatBalances] = useState<WalletType>({
    balance: { btc: 0, eth: 0, sol: 0, usd: 0 }
  })
  const [totalWalletBalance, setTotalWalletBalance] = useState(0)

  const { btcPrice, ethPrice, solPrice } = useContext(
    TickerContext
  ) as ITickerContext

  useEffect(() => {
    setFiatBalances(() => {
      const fiatWallet: WalletType = {
        balance: { btc: 0, eth: 0, sol: 0, usd: 0 }
      }
      setTotalWalletBalance(
        Object.keys(wallet.balance)
          .map((key) => {
            if (key === "btc") {
              fiatWallet.balance.btc =
                parseFloat(btcPrice) * wallet.balance[key]
              return fiatWallet.balance.btc
            }
            if (key === "eth") {
              fiatWallet.balance.eth =
                parseFloat(ethPrice) * wallet.balance[key]
              return fiatWallet.balance.eth
            }
            if (key === "sol") {
              fiatWallet.balance.sol =
                parseFloat(solPrice) * wallet.balance[key]
              return fiatWallet.balance.sol
            }
            if (key === "usd") {
              fiatWallet.balance.usd = wallet.balance[key]
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
        <div className='assets-pie'></div>
      </div>
      <div className='history-container'>
        <h3 className='history-label'>History</h3>
        <DataGrid
          rows={history}
          columns={gridColumns}
          className='wallet-history-grid'
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default Wallet
