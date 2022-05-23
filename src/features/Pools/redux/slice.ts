import { createSlice } from '@reduxjs/toolkit';
import { defaults } from 'lodash';

import { initialState } from './initialState';
import { getTokens, addLiquidity } from './thunks';
import { selectPools } from './selectors';

const slice = createSlice({
  name: 'boardCreation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTokens.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getTokens.fulfilled, (state, action) => {
        const { payload } = action;

        state.status = 'fulfilled';
        state.data.tokens = defaults(payload, initialState.data.tokens);
      })
      .addCase(getTokens.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      })
      .addCase(addLiquidity.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addLiquidity.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(addLiquidity.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  },
});

const { reducer } = slice;

export { reducer, selectPools, getTokens, addLiquidity };
