import { createReducer } from '@reduxjs/toolkit';
import { ZenaiState } from './types';
import {
  fetchZenaiHistory,
  generateZenaiText,
  deleteZenaiHistoryEntry,
  getZenaiHistoryEntry,
  fetchZenaiHistoryTitle
} from './actions';

export const initialState: ZenaiState = {
  loading: false,
  error: null,
};

const zenaiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchZenaiHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchZenaiHistory.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchZenaiHistory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Failed to fetch ZenAI history';
    })
    .addCase(generateZenaiText.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(generateZenaiText.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(generateZenaiText.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Failed to generate ZenAI text';
    })
    .addCase(deleteZenaiHistoryEntry.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteZenaiHistoryEntry.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(deleteZenaiHistoryEntry.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Failed to delete ZenAI history entry';
    })
    .addCase(getZenaiHistoryEntry.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getZenaiHistoryEntry.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(getZenaiHistoryEntry.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Failed to get ZenAI history entry';
    })
    .addCase(fetchZenaiHistoryTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchZenaiHistoryTitle.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchZenaiHistoryTitle.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Failed to get ZenAI history entry';
    });
});

export default zenaiReducer; 