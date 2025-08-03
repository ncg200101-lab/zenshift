import { createReducer } from '@reduxjs/toolkit';
import {
    JournalState,
} from './types';
import {
    getAllJournalsAction,
    getJournalByIdAction,
} from './actions';

export const initialState: JournalState = {
    isLoading: false,
    error: '',
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getAllJournalsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAllJournalsAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getAllJournalsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(getJournalByIdAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getJournalByIdAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getJournalByIdAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
);