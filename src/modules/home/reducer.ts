import { createSlice } from '@reduxjs/toolkit'

export type SiteType = { tagLine: string; developer: { name: string; url: string }; title: string }
const initialState: SiteType = {
  title: 'Shivi Poetry',
  tagLine: '',
  developer: { name: 'Shiviraj', url: 'https://www.shiviraj.com/about-me' }
}

const siteReducer = createSlice({
  initialState,
  name: 'siteReducer',
  reducers: {
    // SET_POPUP: (state, { payload }: PayloadAction<{ value: boolean; message: string }>) => {
    //   state.popUp = { open: payload.value, message: payload.message }
    // }
  }
})

export default siteReducer
