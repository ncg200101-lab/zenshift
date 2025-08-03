import { createReducer } from '@reduxjs/toolkit';
import {
    sendEmailAction,
} from './actions';
import { EmailState } from './types';

export const initialState: EmailState = {
    isLoading: false,
    error: '',
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(sendEmailAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(sendEmailAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(sendEmailAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Send email failed';
        })
);