import axios, { AxiosError } from 'axios'
import { getStorage, StorageKeys } from '../utils'

const initHeaders = (): { authorization: string; 'Content-Type': string } => {
  const { token } = getStorage<{ token: string }>(StorageKeys.AUTH) ?? { token: '' }
  return {
    'Content-Type': 'application/json',
    authorization: token
  }
}

const fetch = <ResultType extends Record<string, unknown> | Array<Record<string, unknown>>>(
  url: string,
  data?: Record<string, unknown>,
  options?: Record<string, unknown>
): Promise<ResultType> => {
  return new Promise((resolve, reject) => {
    axios({ url, ...options, headers: initHeaders(), data })
      .then(({ data }: { data: ResultType }) => {
        resolve(data)
      })
      .catch((error: Error) => {
        if (error instanceof AxiosError) {
          reject(error.response?.data)
        } else {
          reject(error.message)
        }
      })
  })
}

export default fetch
