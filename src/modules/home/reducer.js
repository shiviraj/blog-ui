import { SET_POPUP } from './action'

const { SET_SITE_DETAILS } = require('./action')

const initialState = {
  title: '$hiviPoetry',
  tagLine: '',
  developer: 'Shiviraj',
  popUp: { open: false, message: '' }
}

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SITE_DETAILS:
      return { ...state, ...action.siteDetails }
    case SET_POPUP:
      return { ...state, popUp: { open: action.value, message: action.message } }
    default:
      return state
  }
}

export default siteReducer
