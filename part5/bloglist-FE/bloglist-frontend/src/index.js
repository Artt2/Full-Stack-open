import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter as Router } from "react-router-dom"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
<Router>
  <Provider store={store}>
    <div className="container">
      <App />
    </div>
  </Provider>
</Router>
)
