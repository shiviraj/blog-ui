import WebClient from 'web-client-starter'
import { getStorage, StorageKeys } from '../utils'

WebClient.interceptor.request(config => {
  const { token } = getStorage<{ token: string }>(StorageKeys.AUTH) ?? { token: '' }
  config.headers.authorization = token
  return config
})

export default WebClient
