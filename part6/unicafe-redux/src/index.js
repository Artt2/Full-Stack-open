import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handler = (type) => {
    store.dispatch({
      type: type
    })
  }

  return (
    <div>
      <button onClick={() => handler("GOOD")}>good</button> 
      <button onClick={() => handler("OK")}>ok</button> 
      <button onClick={() => handler("BAD")}>bad</button>
      <button onClick={() => handler("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)