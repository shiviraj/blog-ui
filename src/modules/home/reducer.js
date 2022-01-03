const { SET_SITE_DETAILS } = require('./action')

const initialState = {
  title: 'DevsBone',
  tagLine: 'Learn Software From Scratch',
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
