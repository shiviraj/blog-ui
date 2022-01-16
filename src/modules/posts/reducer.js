import { SET_LOADER, SET_POST, SET_POST_AUTHOR, SET_POST_CATEGORIES, SET_POST_COMMENTS, SET_POST_TAGS } from './action'

const initialState = {
  post: {},
  tags: [],
  categories: [],
  author: {},
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
    case SET_POST_TAGS:
      return { ...state, tags: action.tags }
    case SET_POST_CATEGORIES:
      return { ...state, categories: action.categories }
    case SET_POST_AUTHOR:
      return { ...state, author: action.author }
    default:
      return { ...state }
  }
}

export default postReducer
