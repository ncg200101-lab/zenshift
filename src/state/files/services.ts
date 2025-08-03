import apiHandler from '../global/api';
import { ActionResponse } from '../global/types';
import { FileUploadResponse } from './types';

export const uploadFileService = async (file: File): Promise<ActionResponse<FileUploadResponse>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiHandler.makeApiCall<FileUploadResponse>(
      '/api/files/upload',
      'POST',
      {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return apiHandler.handleActionResponse(response);
  } catch (error: any) {
    return apiHandler.handleActionError(error);
  }
};