export const SITE_DETAILS = 'SITE_DETAILS'

export const SET_SITE_DETAILS = `SET_${SITE_DETAILS}`
export const SET_POPUP = 'SET_POPUP'

export const openPopUp = (message, value = true) => ({ type: SET_POPUP, value, message })
