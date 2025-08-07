import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllOrdersService,
    checkExistingPurchaseService,
} from './services';
import { handleActionResponse } from '../global/actions';
import {
    GetOrdersSuccessResponse,
    CheckPurchaseResponse
} from './types';

export const getAllOrdersAction = createAsyncThunk<
  GetOrdersSuccessResponse,
  { page?: string; limit?: string } | undefined,
  { rejectValue: string }
>(
  'orders/getAllOrders',
  async (queries, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersService(queries);
      const result = handleActionResponse<GetOrdersSuccessResponse>(
        response,
        'Get all orders successfully',
        'Failed to get all orders'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to get orders';
        toast.error(errorMessage, { autoClose: 2000 });
        return rejectWithValue(errorMessage);
    }
  }
);

export const checkExistingPurchaseAction = createAsyncThunk<
  CheckPurchaseResponse,
  { email: string; productId: string },
  { rejectValue: string }
>(
  'orders/checkExistingPurchase',
  async ({ email, productId }, { rejectWithValue }) => {
    try {
      const response = await checkExistingPurchaseService(email, productId);
      const result = handleActionResponse<CheckPurchaseResponse>(
        response,
        'Check existing purchase successfully',
        'Failed to check existing purchase'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to check existing purchase';
        return rejectWithValue(errorMessage);
    }
  }
);

