import { GET_POST, SET_LOADER, SET_POST } from './action'

const initialState = {
  post: null,
  loader: false
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
    case SET_POST:
      return { ...state, post: { ...state.post, ...action.post } }
    case SET_LOADER:
      return { ...state, loader: action.loader }
    default:
      return state
  }
}

export default postReducer
