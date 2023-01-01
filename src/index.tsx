import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Bali from "./components/Bali"
import TickersProvider from "./context/tickersContext"
import UserProvider from "./context/userContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <TickersProvider>
      <UserProvider>
        <Bali />
      </UserProvider>
    </TickersProvider>
  </React.StrictMode>
)
