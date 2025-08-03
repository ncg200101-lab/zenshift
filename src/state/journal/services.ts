import apiHandler from '../global/api';
import { ApiError, ActionResponse } from '../global/types';
import {
    SortByTypes,
    JournalTypes,
    GetJournalsResponse,
} from './types';

export const getJournalByIdService = async (id: string): Promise<ActionResponse<JournalTypes>> => {
    try {
        const response = await apiHandler.makeApiCall<JournalTypes>(
            `/api/journals/${id}`,
            'GET',
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const getAllJournalsService = async (
    queries?: { shift?: string; page?: string; limit?: string; sortBy?: SortByTypes }
): Promise<ActionResponse<GetJournalsResponse>> => {
    try {
        const response = await apiHandler.makeApiCall<GetJournalsResponse>(
            '/api/journals',
            'GET',
            queries ? { params: queries } : undefined
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const createJournalService = async (
    data: FormData
): Promise<ActionResponse<JournalTypes>> => {
    try {
        const response = await apiHandler.makeApiCall<JournalTypes>(
            '/api/journals',
            'POST',
            {
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const updateJournalService = async (
    id: string,
    data: FormData
): Promise<ActionResponse<JournalTypes>> => {
    try {
        const response = await apiHandler.makeApiCall<JournalTypes>(
            `/api/journals/${id}`,
            'PUT',
            {
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};

export const deleteJournalService = async (
    id: string
): Promise<ActionResponse<{ success: boolean }>> => {
    try {
        const response = await apiHandler.makeApiCall<{ success: boolean }>(
            `/api/journals/${id}`,
            'DELETE'
        );
        return apiHandler.handleActionResponse(response);
    } catch (error) {
        return apiHandler.handleActionError(error as ApiError);
    }
};