import { createReducer } from '@reduxjs/toolkit';
import { getAllUsersAction, updateUserAction, deleteUserAction } from './actions';
import { UsersState } from './types';

const initialState: UsersState = {
  isLoading: false,
  error: undefined,
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllUsersAction.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(getAllUsersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
    .addCase(updateUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(updateUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(updateUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
    .addCase(deleteUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(deleteUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(deleteUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
    
});

export default usersReducer; 