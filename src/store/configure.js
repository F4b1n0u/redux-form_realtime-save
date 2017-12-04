import { compose, createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer, {
  epic as rootEpic,
} from '../modules'

export default function configureStore(initialState) {
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const middlewares = [epicMiddleware]
  const enhancer = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  return store
}
