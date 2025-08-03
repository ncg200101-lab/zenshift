import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { uploadFileService } from './services';
import { handleActionResponse } from '../global/actions';
import {
    FileUploadResponse,
} from './types';

export const uploadFileAction = createAsyncThunk<
    FileUploadResponse,
    File,
    { rejectValue: string }
>(
    'files/upload',
    async (file, { rejectWithValue }) => {
        try {
            const response = await uploadFileService(file);
            const result = handleActionResponse<FileUploadResponse>(
                response,
                'File uploaded successfully',
                'Failed to upload file'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }

            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);