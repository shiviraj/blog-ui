import { SET_LOADER, SET_POST, SET_POST_COMMENTS } from './action'

const initialState = {
  post: {},
  comments: [],
  loader: false
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      const post = { ...state.post, ...action.post }
      return { ...state, post }
    case SET_LOADER:
      return { ...state, loader: action.loader }
    case SET_POST_COMMENTS:
      return { ...state, comments: action.comments }
    default:
      return { ...state }
  }
}

export default postReducer
