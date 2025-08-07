import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getJournalByIdService, getAllJournalsService, createJournalService, updateJournalService, deleteJournalService, getJournalTopicsService } from './services';
import { handleActionResponse } from '../global/actions';
import {
  JournalTypes,
  SortByTypes,
  GetJournalsResponse,
} from './types';

export const getJournalByIdAction = createAsyncThunk<
    JournalTypes,
    string,
    { rejectValue: string }
>(
    'journal/getJournalById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getJournalByIdService(id);
            const result = handleActionResponse<JournalTypes>(
                response,
                'Get journal by id successfully',
                'Failed to get journal'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }

            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get journal';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const getAllJournalsAction = createAsyncThunk<
    GetJournalsResponse,
    { shift?: string; page?: string; limit?: string; sortBy?: SortByTypes; topic?: string } | undefined,
    { rejectValue: string }
>(
    'journal/getAllJournals',
    async (queries, { rejectWithValue }) => {
        try {
            const response = await getAllJournalsService(queries);
            const result = handleActionResponse<GetJournalsResponse>(
                response,
                'Get all journals successfully',
                'Failed to get all journals'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get all journals';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const createJournalAction = createAsyncThunk<
    JournalTypes,
    FormData,
    { rejectValue: string }
>(
    'journal/createJournal',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createJournalService(data);
            const result = handleActionResponse<JournalTypes>(
                response,
                'Journal created successfully',
                'Failed to create journal'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create journal';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateJournalAction = createAsyncThunk<
    JournalTypes,
    { id: string; data: FormData },
    { rejectValue: string }
>(
    'journal/updateJournal',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateJournalService(id, data);
            const result = handleActionResponse<JournalTypes>(
                response,
                'Journal updated successfully',
                'Failed to update journal'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update journal';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteJournalAction = createAsyncThunk<
    { success: boolean },
    string,
    { rejectValue: string }
>(
    'journal/deleteJournal',
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteJournalService(id);
            const result = handleActionResponse<{ success: boolean }>(
                response,
                'Journal deleted successfully',
                'Failed to delete journal'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete journal';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const getJournalTopicsAction = createAsyncThunk<
    { topics: string[] },
    void,
    { rejectValue: string }
>(
    'journal/getJournalTopics',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getJournalTopicsService();
            const result = handleActionResponse<{ topics: string[] }>(
                response,
                'Get journal topics successfully',
                'Failed to get journal topics'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get journal topics';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);