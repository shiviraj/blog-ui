import { combineReducers } from 'redux'
import siteReducer from '../modules/home/reducer'
import userReducer from '../modules/user/reducer'

const reducer = combineReducers({ site: siteReducer, user: userReducer })

export default reducer
