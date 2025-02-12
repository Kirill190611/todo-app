import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  themeMode: 'light' as ThemeMode,
}

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>('app/change-theme')

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode
  })
})

export type ThemeMode = 'light' | 'dark'
