import api from '../api'

const UNDEFINED = 'undefined'

export enum StorageKeys {
  VISITOR_ID = 'VISITOR_ID',
  VISITOR = 'VISITOR'
}

export const setStorage = <T extends Record<string, unknown>>(key: string, value: T): T => {
  if (typeof window !== UNDEFINED) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return value
}

export const getStorage = <T extends Record<string, unknown>>(key: string): T | null => {
  try {
    if (typeof window !== UNDEFINED) {
      return JSON.parse(window.localStorage.getItem(key) ?? '') as T
    }
    return null
  } catch (error) {
    return null
  }
}

export const getVisitorId = (): Promise<string> => {
  const visitor = getStorage<{ visitorId: string }>(StorageKeys.VISITOR_ID)
  if (visitor === null) {
    return api.authors.getVisitorId().then((visitor: { visitorId: string }) => {
      setStorage(StorageKeys.VISITOR_ID, visitor)
      return visitor.visitorId
    })
  }
  return Promise.resolve(visitor.visitorId)
}
