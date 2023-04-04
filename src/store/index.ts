import { configureStore } from '@reduxjs/toolkit'
import type { SiteType } from '../modules/home/reducer'
import siteReducer from '../modules/home/reducer'
import { useSelector } from 'react-redux'

const store = configureStore({ reducer: { site: siteReducer.reducer } })

export const useSite = (): SiteType => useSelector((state: RootState) => state.site)

export type RootState = ReturnType<typeof store.getState>
export default store
