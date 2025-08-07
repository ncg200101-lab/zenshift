import { createReducer } from '@reduxjs/toolkit';
import {
    createCheckoutSessionAction,
    getSubscriptionStatusAction,
} from './actions';
import type { SubscriptionState } from './types';

const initialState: SubscriptionState = {
    isLoading: false,
    error: undefined,
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(createCheckoutSessionAction.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
        .addCase(createCheckoutSessionAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(createCheckoutSessionAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getSubscriptionStatusAction.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
        .addCase(getSubscriptionStatusAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getSubscriptionStatusAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
});
