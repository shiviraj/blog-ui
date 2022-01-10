import { combineReducers } from 'redux'
import siteReducer from '../modules/home/reducer'
import userReducer from '../modules/user/reducer'
import postReducer from '../modules/role/posts/reducer'

const reducer = combineReducers({ site: siteReducer, user: userReducer, post: postReducer })

export default reducer
