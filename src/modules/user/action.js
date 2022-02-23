export const USER = 'USER'

export const SET_USER = `SET_${USER}`
export const UNSET_USER = `UNSET_${USER}`

export const setUser = (user = {}) => ({ type: SET_USER, user })
export const unsetUser = () => ({ type: UNSET_USER })
