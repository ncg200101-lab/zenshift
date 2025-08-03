import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchZenaiHistoryService,
  generateTextService,
  deleteHistoryEntryService,
  fetchZenaiHistoryTitleService,
  getHistoryEntryService
} from './services';
import { handleActionResponse } from '../global/actions';
import { 
  FetchZenaiHistorySuccessResponse,
  GenerateTextSuccessResponse,
  DeleteHistorySuccessResponse,
  FetchAllHistoryTitleSuccessResponse,
  getHistoryEntrySuccessResponse
} from './types';

export const fetchZenaiHistory = createAsyncThunk<
  FetchZenaiHistorySuccessResponse,
  { page?: string; limit?: string; } | undefined,
  { rejectValue: string }
>(
  'zenai/fetchHistory',
  async (queries, { rejectWithValue }) => {
    try {
      const response = await fetchZenaiHistoryService(queries);
      const result = handleActionResponse<FetchZenaiHistorySuccessResponse>(
        response,
        'Fetched ZenAI history successfully',
        'Failed to fetch ZenAI history'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch ZenAI history';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchZenaiHistoryTitle = createAsyncThunk<
  FetchAllHistoryTitleSuccessResponse,
  { page?: string; limit?: string; } | undefined,
  { rejectValue: string }
>(
  'zenai/fetchHistoryTitle',
  async (queries, { rejectWithValue }) => {
    try {
      const response = await fetchZenaiHistoryTitleService(queries);
      const result = handleActionResponse<FetchAllHistoryTitleSuccessResponse>(
        response,
        'Fetched ZenAI history titles successfully',
        'Failed to fetch ZenAI history titles'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch ZenAI history titles';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);

export const generateZenaiText = createAsyncThunk<
  GenerateTextSuccessResponse,
  { input_text: string; zenai_model_id: string | null },
  { rejectValue: string }
>(
  'zenai/generateText',
  async ({ input_text, zenai_model_id }, { rejectWithValue }) => {
    try {
      const response = await generateTextService(input_text, zenai_model_id);
      const result = handleActionResponse<GenerateTextSuccessResponse>(
        response,
        'Generated ZenAI text successfully',
        'Failed to generate ZenAI text'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate ZenAI text';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteZenaiHistoryEntry = createAsyncThunk<
DeleteHistorySuccessResponse,
  { zenai_model_id: string; },
  { rejectValue: string }
>(
  'zenai/deleteHistoryEntry',
  async ({ zenai_model_id }, { rejectWithValue }) => {
    try {
      const response = await deleteHistoryEntryService(zenai_model_id);
      const result = handleActionResponse<DeleteHistorySuccessResponse>(
        response,
        'Deleted ZenAI history entry successfully',
        'Failed to delete ZenAI history entry'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete ZenAI history entry';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);

export const getZenaiHistoryEntry = createAsyncThunk<
getHistoryEntrySuccessResponse,
  { zenai_model_id: string; },
  { rejectValue: string }
>(
  'zenai/getHistoryEntry',
  async ({ zenai_model_id }, { rejectWithValue }) => {
    try {
      const response = await getHistoryEntryService(zenai_model_id);
      const result = handleActionResponse<getHistoryEntrySuccessResponse>(
        response,
        'Get ZenAI history entry successfully',
        'Failed to get ZenAI history entry'
      );
      if (typeof result === 'string') {
        return rejectWithValue(result);
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get ZenAI history entry';
      toast.error(errorMessage, { autoClose: 2000 });
      return rejectWithValue(errorMessage);
    }
  }
);