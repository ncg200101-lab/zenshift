import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllOrdersService,
} from './services';
import { handleActionResponse } from '../global/actions';
import {
    GetOrdersSuccessResponse
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

