// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const LOAD = 'redux-form-examples/account/LOAD'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.payload
      }
    default:
      return state
  }
}

export const load = () => ({
  type: LOAD,
  payload: {
    firstName: 'Jane',
    lastName: 'Doe',
    age: '42',
    sex: 'female',
    employed: true,
    favoriteColor: 'Blue',
    bio: 'Born to write amazing Redux code.'
  }
})

export const getData = state => state.account.data

export default reducer
