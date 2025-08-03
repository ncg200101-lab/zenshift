import { createReducer } from '@reduxjs/toolkit';
import { getAllOrdersAction } from './actions';
import { OrderState } from './types';

const initialState: OrderState = {
  isLoading: false,
  error: undefined,
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllOrdersAction.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(getAllOrdersAction.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(getAllOrdersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
});

export default usersReducer; 