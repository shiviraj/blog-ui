import { SET_USER } from './action'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.user }
    default:
      return state
  }
}

export default userReducer
