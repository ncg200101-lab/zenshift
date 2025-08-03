import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    sendEmailService,
} from './services';
import { 
    SendEmailParams,
    SendEmailSuccessResponse,
    ErrorResponse
} from './types';

const handleActionResponse = <T extends { message?: string }>(
    response: { success: boolean; data?: T; error?: ErrorResponse },
    successMessage: string,
    errorMessage: string
): T | string => {
    if (response.success && response.data) {
        toast.success(response.data.message || successMessage, { autoClose: 2000 });
        return response.data;
    }

    const error = response.error?.message || response.error?.error || errorMessage;
    toast.error(error, { autoClose: 2000 });
    return error;
};

export const sendEmailAction = createAsyncThunk<
    void,
    SendEmailParams,
    { rejectValue: string }
>(
    'email/send',
    async (params, { rejectWithValue }) => {
        try {
            const response = await sendEmailService(params);
            const result = handleActionResponse<SendEmailSuccessResponse>(
                response,
                'Send email successful',
                'Send email failed'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Send email failed';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);
