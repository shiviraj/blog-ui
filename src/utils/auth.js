import { clearStorage, setStorage } from './storage'
import { ROUTES } from '../config/routes'
import { redirectTo } from './routing'
import { StorageKeys } from '../constants/storage'

const logout = () => {
  clearStorage()
  return redirectTo(ROUTES.LOGIN)
}

const handleUnauthorized = () => {
  clearStorage()
  redirectTo(ROUTES.LOGIN)
}

const handleLogin = (data) => {
  setStorage(StorageKeys.AUTH, data)
  redirectTo(ROUTES.HOME[data.user.role])
}

export { handleLogin, handleUnauthorized, logout }
