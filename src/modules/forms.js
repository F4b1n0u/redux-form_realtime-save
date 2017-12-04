// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import { actionTypes } from 'redux-form'
import {
  reducer,
  getFormValues,
  startSubmit,
  stopSubmit,
} from 'redux-form';

import {
  RECEIVE_SAVE_SUCCESS,
  requestSave as requestSaveRelease,
} from './releases'

export const KEY = 'form' // default one ! DO NOT TOUCH before checking documentation

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

// const submitEpic = (action$, store) => action$
//   .ofType(actionTypes.SUBMIT)
//   .mergeMap(({ meta: { form } }) =>  {
//     const state = store.getState()
    
//     let result

//     switch(form) {
//       case 'release':
//           result = Observable.of(startSubmit(form))
//         break
//       default:
//         result = Observable.empty()
//         break
//     }

//     return result
//   })

const submitSuccessEpic = (action$, store) => action$
  .ofType(actionTypes.SET_SUBMIT_SUCCEEDED)
  .mergeMap(({ meta: { form } }) => {
    const state = store.getState()
    
    let result

    switch(form) {
      case 'release':
        const release = getFormValues(form)(state)
        result = Observable.of(requestSaveRelease(release))
        break
      default:
        result = Observable.empty()
        break
    }

    return result
  })

const receiveSaveReleaseSuccessEpic = (action$, store) => action$
  .ofType(RECEIVE_SAVE_SUCCESS)
  .mergeMap(action => Observable.of(stopSubmit('release')))

export const epic = combineEpics(
  submitSuccessEpic,
  receiveSaveReleaseSuccessEpic,
)