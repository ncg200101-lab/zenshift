import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllUsersService,
    updateUserService,
    deleteUserService
} from './services';
import { handleActionResponse } from '../global/actions';
import {
    UpdateUserParams,
    DeleteUserParams,
    User,
    GetUsersSuccessResponse
} from './types';

export const getAllUsersAction = createAsyncThunk<
  GetUsersSuccessResponse,
  { page?: string; limit?: string } | undefined,
  { rejectValue: string }
>(
  'users/getAllUsers',
  async (queries, { rejectWithValue }) => {
    try {
      const response = await getAllUsersService(queries);
      const result = handleActionResponse<GetUsersSuccessResponse>(
        response,
        'Get all users successfully',
        'Failed to get all users'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to get users';
        toast.error(errorMessage, { autoClose: 2000 });
        return rejectWithValue(errorMessage);
    }
  }
);

// Update a user
export const updateUserAction = createAsyncThunk<
  User,
  UpdateUserParams,
  { rejectValue: string }
>(
  'users/update',
  async (params, { rejectWithValue }) => {
    try {
      const response = await updateUserService(params);
      const result = handleActionResponse<User>(
        response,
        'User updated successfully',
        'Failed to update user'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete a user
export const deleteUserAction = createAsyncThunk<
  string,
  DeleteUserParams,
  { rejectValue: string }
>(
  'users/delete',
  async (params, { rejectWithValue }) => {
    try {
      const response = await deleteUserService(params);
      const result = handleActionResponse<{ success: boolean }>(
        response,
        'User deleted successfully',
        'Failed to delete user'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return params.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);

