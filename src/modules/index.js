import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import peoplesReducer, {
  KEY as PEOPLES_KEY,
  epic as peoplesEpic,
} from '../modules/peoples'

import formsReducer, {
  KEY as FORMS_KEY,
  epic as formEpic,
} from '../modules/forms'

import appReducer, {
  KEY as APP_KEY,
  epic as appEpic,
} from '../modules/app'

// Reducers
export default combineReducers({
  [FORMS_KEY]: formsReducer,
  [PEOPLES_KEY]: peoplesReducer,
  [APP_KEY]: appReducer,
})

// Epics
export const epic = combineEpics(
  formEpic,
  peoplesEpic,
  appEpic,
)
