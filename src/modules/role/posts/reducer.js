import { GET_EDIT_POST, SET_LOADER, SET_EDIT_POST } from './action'

const initialState = {
  post: null,
  loader: false
}

const editPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EDIT_POST:
    case SET_EDIT_POST:
      return { ...state, post: { ...state.post, ...action.post } }
    case SET_LOADER:
      return { ...state, loader: action.loader }
    default:
      return state
  }
}

export default editPostReducer
