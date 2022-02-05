const { SET_SITE_DETAILS } = require('./action')

const initialState = {
  title: '$hiviPoetry',
  tagLine: '',
  developer: 'Shiviraj'
}

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SITE_DETAILS:
      return { ...state, ...action.siteDetails }
    default:
      return state
  }
}

export default siteReducer
