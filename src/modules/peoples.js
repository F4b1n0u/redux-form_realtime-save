// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { fetchPeoples, savePeople } from '../services/system-people'
import { startSubmit, stopSubmit } from 'redux-form'
import { getFormValues } from 'redux-form'

import { errors, warnings } from '../validations/people'

import { getPeoplesFormName } from '../modules/forms'

export const KEY = 'peoples'

// ///////////
// DETERMINISTIC ACTIONS
// ///////////

export const PUT                = `spinnup-proto/${KEY}/PUT`
export const PUT_ALL            = `spinnup-proto/${KEY}/PUT_ALL`
export const INITIATE_REQUEST   = `spinnup-proto/${KEY}/INITIATE_REQUEST`
export const TERMINATE_REQUEST  = `spinnup-proto/${KEY}/TERMINATE_REQUEST`

// ///////////
// ACTION CREATORS
// ///////////

export const putPeople = people => ({
  type: PUT,
  payload: people,
})

export const putPeoples = peoples => ({
  type: PUT_ALL,
  payload: peoples,
})

export const initiateRequest = () => ({
  type: INITIATE_REQUEST,
})

export const terminateRequest = () => ({
  type: TERMINATE_REQUEST,
})

// ///////////
// REDUCERS
// ///////////

const initialState = {
  allIds: [],
  byId: {},
  isPending: false,
}

const allIdsReducer = (
  state = initialState.allIds,
  action,
) => {
  switch (action.type) {
    case PUT_ALL:
      return action.payload.map(people => people.id)
    default:
      return state
  }
}

const byIdReducer = (
  state = initialState.byId,
  action,
) => {
  switch (action.type) {
    case PUT_ALL:
      return action.payload.reduce(
        (map, people) => {
          map[people.id] = people
          return map
        },
        {}
      )
    default:
      return state
  }
}

const isPendingReducer = (
  state = initialState.isPending,
  action,
) => {
  switch (action.type) {
    case INITIATE_REQUEST:
      return true
    case TERMINATE_REQUEST:
      return false
    default:
      return state
  }
}

export default combineReducers({
  allIds: allIdsReducer,
  byId: byIdReducer,
  isPending: isPendingReducer,
})

// ///////////
// SELECTORS
// ///////////

export const getState = state => state[KEY]
export const getIdByIndex = (state, index) => getState(state).allIds[index]
export const getIndexById = (state, id) => getState(state).allIds.indexOf(id)
export const getByIndex = (state, index) => getById(state, getIdByIndex(state, index))
export const getById = (state, peopleId) => getState(state).byId[peopleId]
export const getAllIds = state => getState(state).allIds
export const getAll = state => getAllIds(state).map(getById.bind(null, state))

// ///////////
// NON DETERMINISTIC ACTIONS
// ///////////

export const REQUEST_ALL          = `spinnup-proto/${KEY}/REQUEST_ALL`
export const RECEIVE_ALL_SUCCESS  = `spinnup-proto/${KEY}/RECEIVE_ALL_SUCCESS`
export const RECEIVE_ALL_FAILURE  = `spinnup-proto/${KEY}/RECEIVE_ALL_FAILURE`
export const REQUEST_SAVE         = `spinnup-proto/${KEY}/REQUEST_SAVE`
export const RECEIVE_SAVE_SUCCESS = `spinnup-proto/${KEY}/RECEIVE_SAVE_SUCCESS`
export const RECEIVE_SAVE_FAILURE = `spinnup-proto/${KEY}/RECEIVE_SAVE_FAILURE`

// ///////////
// ACTION CREATORS
// ///////////

export const requestAll = () => ({
  type: REQUEST_ALL,
})

export const receiveAll = (peoples) => ({
  type: RECEIVE_ALL_SUCCESS,
  payload: peoples,
})

export const receiveAllFailure = ({ error, validData}) => ({
  type: RECEIVE_ALL_FAILURE,
  payload: error,
  meta: {
    validData,
  }
})

export const requestSave = (people) => ({
  type: REQUEST_SAVE,
  payload: people,
})

export const receiveSave = updatedPeople => ({
  type: RECEIVE_SAVE_SUCCESS,
  payload: updatedPeople,
})

export const receiveSaveFailure = (latestPeople, attempt) => ({
  type: RECEIVE_SAVE_FAILURE,
  payload: latestPeople,
  meta: {
    attempt,
  }
})

// ///////////
// EPICS
// ///////////

const initiateRequestEpic = action$ => action$
  .ofType(REQUEST_ALL, REQUEST_SAVE)
  .mergeMap(() => Observable.of(initiateRequest()))

const terminateRequestEpic = action$ => action$
  .ofType(
    RECEIVE_ALL_SUCCESS,
    RECEIVE_ALL_FAILURE,
    RECEIVE_SAVE_SUCCESS,
    RECEIVE_SAVE_FAILURE,
  )
  .mergeMap(() => Observable.of(terminateRequest()))

const requestPeoplesEpic = action$ => action$
  .ofType(REQUEST_ALL)
  .mergeMap(() => fetchPeoples()
    .mergeMap(response => Observable.of(receiveAll(response)))
    .catch(error => Observable.of(receiveAllFailure(error)))
  )

const receivePeoplesEpic = action$ => action$
  .ofType(RECEIVE_ALL_SUCCESS)
  .mergeMap(({ payload }) => Observable.of(putPeoples(payload)))

const startSubmitEpic = (action$, { getState }) => action$
  .ofType(REQUEST_SAVE)
  .mergeMap(({payload: { id }}) => {
    const state = getState()
    const index = getIndexById(state, id)
    return Observable.of(startSubmit(getPeoplesFormName({ index })))
  })

const stopSumitOnSaveSuccessEpic = (action$, { getState }) => action$
  .ofType(RECEIVE_SAVE_SUCCESS)
  .mergeMap(({payload: { id }}) => {
    const state = getState()
    const index = getIndexById(state, id)
    return Observable.of(stopSubmit(getPeoplesFormName({ index })))
  })

const stopSumitOnSaveFaillureEpic = (action$, { getState }) => action$
  .ofType(RECEIVE_SAVE_FAILURE)
  .mergeMap(({payload: { id }}) => {
    const state = getState()
    const index = getIndexById(state, id)
    return Observable.of(stopSubmit(getPeoplesFormName({ index })))
  })

const savePeopleEpic = (action$, { getState, dispatch }) => action$
  .ofType(REQUEST_SAVE)
  .mergeMap(action => savePeople(action.payload)
    .takeUntil(action$
      .ofType(REQUEST_SAVE)
      .filter(
        ({ payload }) => payload.id === action.payload.id
      )
    )
    .mergeMap(({ response }) => Observable.of(receiveSave(response)))
    .catch(error => Observable.of(receiveSaveFailure(error, action.payload)))
  )

const receivePeopleEpic = action$ => action$
  .ofType(RECEIVE_SAVE_SUCCESS)
  .mergeMap(({ payload }) => Observable.of(putPeople(payload)))

export const epic = combineEpics(
  initiateRequestEpic,
  terminateRequestEpic,
  requestPeoplesEpic,
  receivePeoplesEpic,
  savePeopleEpic,
  startSubmitEpic,
  stopSumitOnSaveSuccessEpic,
  stopSumitOnSaveFaillureEpic,
  receivePeopleEpic,
)