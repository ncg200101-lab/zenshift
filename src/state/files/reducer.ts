import { createReducer } from '@reduxjs/toolkit';
import { uploadFileAction } from './actions';
import { FilesState } from './types';

const initialState: FilesState = {
  isLoading: false,
  error: undefined,
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(uploadFileAction.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(uploadFileAction.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(uploadFileAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
});

export default usersReducer; 