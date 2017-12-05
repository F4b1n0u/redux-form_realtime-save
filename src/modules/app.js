// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
// import { stopSubmit } from 'redux-form'

export const KEY = 'app'

// ///////////
// DETERMINISTIC ACTIONS
// ///////////

// ///////////
// ACTION CREATORS
// ///////////

// ///////////
// REDUCERS
// ///////////

const initialState = {
  colors: [{
    label: 'white',
    value: '#ffffff',
  }, {
    label: 'gray',
    value: '#808080',
  }, {
    label: 'black',
    value: '#000000',
  }, {
    label: 'red',
    value: '#ff0000',
  }, {
    label: 'yellow',
    value: '#ffff00',
  }, {
    label: 'green',
    value: '#008000',
  }, {
    label: 'blue',
    value: '#0000ff',
  }],
  moods: [{
    label: '°(❛ᴗ❛)°',
    value: 'happy',
  }, {
    label: 'ᕕ( ᐛ )ᕗ',
    value: 'excited',
  }, {
    label: '(✿ ♥‿♥)',
    value: 'love',
  }, {
    label: '(๑˃̵ᴗ˂̵)و',
    value: 'triumph',
  }, {
    label: 'ヾ(｡ꏿ﹏ꏿ)ﾉﾞ',
    value: 'confused',
  }, {
    label: '(ꐦ ಠ皿ಠ )',
    value: 'hangry',
  }, {
    label: '（´＿｀）',
    value: 'sad',
  }],
}

const colorsReducer = (
  state = initialState.colors,
  action,
) => {
  switch (action.type) {
    default:
      return state
  }
}

const moodsReducer = (
  state = initialState.moods,
  action,
) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  colors: colorsReducer,
  moods: moodsReducer,
})

// ///////////
// SELECTORS
// ///////////

export const getState = state => state[KEY]
export const getColors = state => getState(state).colors
export const getMoods = state => getState(state).moods

// ///////////
// NON DETERMINISTIC ACTIONS
// ///////////

// ///////////
// ACTION CREATORS
// ///////////

// ///////////
// EPICS
// ///////////

export const epic = combineEpics()