import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type SiteType = { popUp: { message: string; open: boolean }; tagLine: string; developer: string; title: string }
const initialState: SiteType = {
  title: 'Shivi Poetry',
  tagLine: '',
  developer: 'Shiviraj',
  popUp: { open: false, message: '' }
}

const siteReducer = createSlice({
  initialState,
  name: 'siteReducer',
  reducers: {
    SET_POPUP: (state, { payload }: PayloadAction<{ value: boolean; message: string }>) => {
      state.popUp = { open: payload.value, message: payload.message }
    }
  }
})

export default siteReducer
