// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import { actionTypes } from 'redux-form'
import {
  reducer,
  getFormValues,
} from 'redux-form'

import {
  requestSave as requestSaveRelease,
} from './releases'

export const KEY = 'form' // default one ! DO NOT TOUCH before checking documentation

export const RELEASES_FORM_KEY = 'releases'

// ///////////
// DETERMINISTIC ACTIONS
// ///////////

// already provided by the redux-form library

// ///////////
// ACTION CREATORS
// ///////////

// already provided by the redux-form library
// https://redux-form.com/7.2.0/docs/api/actioncreators.md/

// ///////////
// REDUCERS
// ///////////

export default reducer

// ///////////
// SELECTORS
// ///////////

// already provided by the redux-form library
// https://redux-form.com/7.2.0/docs/api/selectors.md/

// ///////////
// EPICS
// ///////////

const submitSuccessEpic = (action$, store) => action$
  .ofType(actionTypes.SET_SUBMIT_SUCCEEDED)
  .mergeMap(({ meta: { form } }) => {
    const state = store.getState()
    
    let observable

    const formKey = form.split('[')[0]

    switch(formKey) {
      case RELEASES_FORM_KEY:
        const release = getFormValues(form)(state)
        observable = Observable.of(requestSaveRelease(release))
        break
      default:
        observable = Observable.empty()
        break
    }

    return observable
  })

export const epic = combineEpics(
  submitSuccessEpic,
)