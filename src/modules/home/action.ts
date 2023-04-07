export enum SiteActionKind {
  SITE_DETAILS = 'SITE_DETAILS',
  SET_SITE_DETAILS = `SET_${SITE_DETAILS}`,
  SET_POPUP = 'SET_POPUP'
}

export const openPopUp = (
  message: string,
  value = true
): { type: SiteActionKind; message: string; value: boolean } => ({
  type: SiteActionKind.SET_POPUP,
  value,
  message
})
