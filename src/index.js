import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app'

import storeConfigure from './store/configure'

const dest = document.getElementById('content')

const initialState = {}

const store = storeConfigure(initialState)

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    dest
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = error => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error} className="redbox" />, dest)
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  const rerender = () => {
    setTimeout(render)
  }
  module.hot.accept('./components/app', rerender)
}

render()
  