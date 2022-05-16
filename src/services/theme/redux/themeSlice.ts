import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { AppState } from 'src/app/store';

import type { ThemeMode } from '../types';

type ThemeState = {
  currentMode: ThemeMode;
};

const initialState: ThemeState = {
  currentMode: 'system',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<ThemeState>) => action.payload,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

const themeReducer = themeSlice.reducer;
const { select } = themeSlice.actions;

const selectCurrentMode = (state: AppState) => state.services.theme.currentMode;

export type { ThemeState };

export { themeReducer, select, selectCurrentMode };
