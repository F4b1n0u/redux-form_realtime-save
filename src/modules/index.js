import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import releasesReducer, {
  KEY as RELEASES_KEY,
  epic as releasesEpic,
} from '../modules/releases'

import formsReducer, {
  KEY as FORMS_KEY,
  epic as formEpic,
} from '../modules/forms'

// Reducers
export default combineReducers({
  [FORMS_KEY]: formsReducer,
  [RELEASES_KEY]: releasesReducer,
})

// Epics
export const epic = combineEpics(
  formEpic,
  releasesEpic,
)
