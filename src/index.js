import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import accountReducer from './modules/account'

import App from './components/app'

const dest = document.getElementById('content')

const reducer = combineReducers({
  account: accountReducer,
  form: reduxFormReducer // mounted under "form"
})
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
  