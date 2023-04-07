import { SET_USER, UNSET_USER } from './action'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.user }
    case UNSET_USER:
      return {}
    default:
      return state
  }
}

export default userReducer
