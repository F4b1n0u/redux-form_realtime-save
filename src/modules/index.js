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

// Reducers
export default combineReducers({
  [FORMS_KEY]: formsReducer,
  [PEOPLES_KEY]: peoplesReducer,
})

// Epics
export const epic = combineEpics(
  formEpic,
  peoplesEpic,
)
