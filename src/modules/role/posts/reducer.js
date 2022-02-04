import { GET_EDIT_POST, SET_EDIT_POST, SET_EDIT_POST_CATEGORIES, SET_EDIT_POST_TAGS, SET_LOADER } from './action'

const initialState = {
  post: null,
  tags: [],
  categories: [],
  loader: false
}

// eslint-disable-next-line default-param-last
const editPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EDIT_POST:
    case SET_EDIT_POST:
      return { ...state, post: { ...state.post, ...action.post } }
    case SET_LOADER:
      return { ...state, loader: action.loader }
    case SET_EDIT_POST_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        post: { ...state.post, categories: action.categories.map((it) => it.categoryId) }
      }
    case SET_EDIT_POST_TAGS:
      return { ...state, tags: action.tags, post: { ...state.post, tags: action.tags.map((it) => it.tagId) } }
    default:
      return state
  }
}

export default editPostReducer
