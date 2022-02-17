import { getStorage, setStorage } from './storage'
import { ROUTES } from '../config/routes'
import { redirectTo } from './routing'
import { StorageKeys } from '../constants/storage'

const logout = () => {
  setStorage(StorageKeys.AUTH, null)
  // return redirectTo(ROUTES.LOGIN)
}

const getPath = (data) => {
  const redirectUrl = getStorage(StorageKeys.LOGIN_REDIRECT_URL)
  if (redirectUrl) {
    setStorage(StorageKeys.LOGIN_REDIRECT_URL, '')
    return redirectUrl
  }
  return ROUTES.HOME[data.user.role]
}

const handleLogin = (router, data) => {
  setStorage(StorageKeys.AUTH, data)
  const path = getPath(data)
  redirectTo(path, router)
}

export { handleLogin, logout }
