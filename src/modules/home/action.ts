const SITE_DETAILS = 'SITE_DETAILS'

export enum SiteActionKind {
  SITE_DETAILS = 'SITE_DETAILS',
  SET_SITE_DETAILS = `SET_${SITE_DETAILS}`,
  SET_POPUP = 'SET_POPUP'
}

export interface SiteAction {
  type: SiteActionKind
  payload: Record<string, any>
}

export const openPopUp = (message: string, value = true) => ({ type: SiteActionKind.SET_POPUP, value, message })
