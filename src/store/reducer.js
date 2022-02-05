import { combineReducers } from 'redux'
import siteReducer from '../modules/home/reducer'
import userReducer from '../modules/user/reducer'
import editPostReducer from '../modules/role/posts/reducer'
import postReducer from '../modules/post/reducer'

const reducer = combineReducers({
  site: siteReducer, user: userReducer, editPost: editPostReducer, post: postReducer
})

export default reducer
