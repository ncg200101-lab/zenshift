import apiHandler from '../global/api';
import { ApiError, ActionResponse } from '../global/types';
import {
  GenerateTextSuccessResponse,
  DeleteHistorySuccessResponse,
  FetchZenaiHistorySuccessResponse,
  FetchAllHistoryTitleSuccessResponse,
  getHistoryEntrySuccessResponse
} from './types';

export const generateTextService = async (
  input_text: string,
  zenai_model_id: string | null,
): Promise<ActionResponse<GenerateTextSuccessResponse>> => {
  try {
    const response = await apiHandler.makeApiCall<GenerateTextSuccessResponse>(
      '/api/zenai/generateText',
      'POST',
      {
        data: { input_text, zenai_model_id },
      }
    );
    return apiHandler.handleActionResponse(response);
  } catch (error) {
    return apiHandler.handleActionError(error as ApiError);
  }
};

export const deleteHistoryEntryService = async (
  zenai_model_id: string,
): Promise<ActionResponse<DeleteHistorySuccessResponse>> => {
  try {
    const response = await apiHandler.makeApiCall<DeleteHistorySuccessResponse>(
      `/api/zenai/history/${zenai_model_id}`,
      'DELETE',
    );
    return apiHandler.handleActionResponse(response);
  } catch (error) {
    return apiHandler.handleActionError(error as ApiError);
  }
};

export const fetchZenaiHistoryService = async (
  queries?: { page?: string; limit?: string; }
): Promise<ActionResponse<FetchZenaiHistorySuccessResponse>> => {
  try {
    const response = await apiHandler.makeApiCall<FetchZenaiHistorySuccessResponse>(
      `/api/zenai/allHistory`,
      'GET',
      { params: queries }
    );
    return apiHandler.handleActionResponse(response);
  } catch (error) {
    return apiHandler.handleActionError(error as ApiError);
  }
}; 

export const fetchZenaiHistoryTitleService = async (
  queries?: { page?: string; limit?: string; }
): Promise<ActionResponse<FetchAllHistoryTitleSuccessResponse>> => {
  try {
    const response = await apiHandler.makeApiCall<FetchAllHistoryTitleSuccessResponse>(
      `/api/zenai/allHistoryTitle`,
      'GET',
      { params: queries }
    );
    return apiHandler.handleActionResponse(response);
  } catch (error) {
    return apiHandler.handleActionError(error as ApiError);
  }
}; 

export const getHistoryEntryService = async (
  zenai_model_id: string,
): Promise<ActionResponse<getHistoryEntrySuccessResponse>> => {
  try {
    const response = await apiHandler.makeApiCall<getHistoryEntrySuccessResponse>(
      `/api/zenai/history/${zenai_model_id}`,
      'GET',
    );
    return apiHandler.handleActionResponse(response);
  } catch (error) {
    return apiHandler.handleActionError(error as ApiError);
  }
};