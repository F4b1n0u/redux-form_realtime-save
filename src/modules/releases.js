// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { fetchReleases, saveRelease } from '../services/artists-spinnup'
// import { stopSubmit } from 'redux-form'

export const KEY = 'releases'

// ///////////
// DETERMINISTIC ACTIONS
// ///////////

export const PUT = `spinnup-proto/${KEY}/PUT`

// ///////////
// ACTION CREATORS
// ///////////

export const putReleases = releases => ({
  type: PUT,
  payload: releases,
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
      return action.payload.map(release => release.id)
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
        (map, release) => {
          map[release.id] = release
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

export const get = (state, releaseId) => state[KEY].byId[releaseId]
export const getByIndex = (state, index) => {
  const id = state[KEY].allIds[index] // try to avoid that ...
  return get(state, id)
}
export const getAll = state => state[KEY].allIds.map(get.bind(null, state))

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

export const receiveAll = (releases) => ({
  type: RECEIVE_ALL_SUCCESS,
  payload: releases,
})

export const receiveAllFailure = ({ error, validData}) => ({
  type: RECEIVE_ALL_FAILURE,
  payload: error,
  meta: {
    validData,
  }
})

export const requestSave = release => ({
  type: REQUEST_SAVE,
  payload: release,
})

export const receiveSave = updatedRelease => ({
  type: RECEIVE_SAVE_SUCCESS,
  payload: updatedRelease,
})

export const receiveSaveFailure = latestRelease => ({
  type: RECEIVE_SAVE_FAILURE,
  payload: latestRelease,
})

// ///////////
// EPICS
// ///////////

const requestReleasesEpic = (action$, store) => action$
  .ofType(REQUEST_ALL)
  .mergeMap(() => fetchReleases()
      .mergeMap(response => Observable.of(receiveAll(response)))
      .catch(error => Observable.of(receiveAllFailure(error)))
  )

const receiveReleasesEpic = (action$, store) => action$
  .ofType(RECEIVE_ALL_SUCCESS)
  .mergeMap(action => Observable.of(putReleases(action.payload)))

const saveReleaseEpic = action$ => action$
  .ofType(REQUEST_SAVE)
  .mergeMap((action) => saveRelease(action.payload)
      .takeUntil(action$.filter(
        ({ type, payload }) => type === REQUEST_SAVE && payload.id === action.payload.id
      ))
      .mergeMap(response => Observable.of(receiveSave(response)))
      .catch(error => Observable.of(receiveSaveFailure(error)))
      // .mergeMap(() => Observable.of(stopSubmit(action.payload.id)))
  )

export const epic = combineEpics(
  requestReleasesEpic,
  receiveReleasesEpic,
  saveReleaseEpic,
)