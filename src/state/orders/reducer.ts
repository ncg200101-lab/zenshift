import { createReducer } from '@reduxjs/toolkit';
import { getAllOrdersAction, checkExistingPurchaseAction } from './actions';
import { OrderState, CheckPurchaseResponse } from './types';

const initialState: OrderState & { 
  existingPurchase: CheckPurchaseResponse | null;
  isCheckingPurchase: boolean;
} = {
  isLoading: false,
  error: undefined,
  existingPurchase: null,
  isCheckingPurchase: false,
};

const ordersReducer = createReducer(initialState, (builder) => {
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
    .addCase(checkExistingPurchaseAction.pending, (state) => {
      state.isCheckingPurchase = true;
      state.error = undefined;
    })
    .addCase(checkExistingPurchaseAction.fulfilled, (state, action) => {
      state.isCheckingPurchase = false;
      state.existingPurchase = action.payload;
    })
    .addCase(checkExistingPurchaseAction.rejected, (state, action) => {
      state.isCheckingPurchase = false;
      state.error = action.payload as string;
    })
});

export default ordersReducer; 