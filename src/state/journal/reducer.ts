import { createReducer } from '@reduxjs/toolkit';
import {
    JournalState,
} from './types';
import {
    getAllJournalsAction,
    getJournalByIdAction,
    getJournalTopicsAction,
} from './actions';

export const initialState: JournalState = {
    isLoading: false,
    error: '',
    topics: [],
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
        .addCase(getJournalTopicsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getJournalTopicsAction.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.topics = payload.topics;
        })
        .addCase(getJournalTopicsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
);