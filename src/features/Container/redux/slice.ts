import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { getData, addLiquidity, removeLiquidity, swapIn } from './thunks';
import { selectContainer } from './selectors';

const slice = createSlice({
  name: 'boardCreation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getData.fulfilled, (state, action) => {
        const { payload } = action;

        state.status = 'fulfilled';
        state.data = payload;
      })
      .addCase(getData.rejected, (state, action) => {
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
      })
      .addCase(removeLiquidity.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(removeLiquidity.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(removeLiquidity.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      })
      .addCase(swapIn.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(swapIn.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(swapIn.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  },
});

const { reducer } = slice;

export {
  reducer,
  selectContainer,
  getData,
  addLiquidity,
  removeLiquidity,
  swapIn,
};
