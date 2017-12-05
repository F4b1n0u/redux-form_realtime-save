// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { fetchPeoples, savePeople } from '../services/system-people'
// import { stopSubmit } from 'redux-form'

export const KEY = 'peoples'

// ///////////
// DETERMINISTIC ACTIONS
// ///////////

export const PUT = `spinnup-proto/${KEY}/PUT`

// ///////////
// ACTION CREATORS
// ///////////

export const putPeoples = peoples => ({
  type: PUT,
  payload: peoples,
})

// ///////////
// REDUCERS
// ///////////

const initialState = {
  allIds: [],
  byId: {},
}

const allIdsReducer = (
  state = initialState.allIds,
  action,
) => {
  switch (action.type) {
    case PUT:
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
    case PUT:
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

export default combineReducers({
  allIds: allIdsReducer,
  byId: byIdReducer,
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

export const requestSave = people => ({
  type: REQUEST_SAVE,
  payload: people,
})

export const receiveSave = updatedPeople => ({
  type: RECEIVE_SAVE_SUCCESS,
  payload: updatedPeople,
})

export const receiveSaveFailure = latestPeople => ({
  type: RECEIVE_SAVE_FAILURE,
  payload: latestPeople,
})

// ///////////
// EPICS
// ///////////

const requestPeoplesEpic = (action$, store) => action$
  .ofType(REQUEST_ALL)
  .mergeMap(() => fetchPeoples()
      .mergeMap(response => Observable.of(receiveAll(response)))
      .catch(error => Observable.of(receiveAllFailure(error)))
  )

const receivePeoplesEpic = (action$, store) => action$
  .ofType(RECEIVE_ALL_SUCCESS)
  .mergeMap(action => Observable.of(putPeoples(action.payload)))

const savePeopleEpic = action$ => action$
  .ofType(REQUEST_SAVE)
  .mergeMap((action) => savePeople(action.payload)
      .takeUntil(action$.filter(
        ({ type, payload }) => type === REQUEST_SAVE && payload.id === action.payload.id
      ))
      .mergeMap(response => Observable.of(receiveSave(response)))
      .catch(error => Observable.of(receiveSaveFailure(error)))
      // .mergeMap(() => Observable.of(stopSubmit(action.payload.id)))
  )

export const epic = combineEpics(
  requestPeoplesEpic,
  receivePeoplesEpic,
  savePeopleEpic,
)