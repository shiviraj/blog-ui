import axios from 'axios'
import { getStorage } from '../utils/storage'
import { StorageKeys } from '../constants/storage'
import { handleUnauthorized } from '../utils/auth'
import { RESPONSE_CODES } from './constants'

export const initHeaders = () => {
  const auth = getStorage(StorageKeys.AUTH)
  const token = auth ? auth.token : ''
  return { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
}

const utils = {
  fetch(url, { data, ...options } = {}) {
    return new Promise((resolve, reject) => {
      axios({ url, ...options, headers: { ...initHeaders(), ...options.headers }, data })
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response && error.response.status === RESPONSE_CODES.UNAUTHORIZED) {
            handleUnauthorized()
            reject()
          } else {
            reject(error.response && error.response.data)
          }
        })
    })
  }
}

export default utils
