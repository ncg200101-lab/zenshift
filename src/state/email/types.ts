import { ErrorResponse, ActionResponse } from '../global/types';

export type { ErrorResponse };

export type SendEmailSuccessResponse = {
    message?: string;
}

export type SendEmailServiceResponse = ActionResponse<SendEmailSuccessResponse>;

export type SendEmailParams = {
    fullName: string;
    email: string;
    message: string;
}

export type EmailState = {
    isLoading: boolean;
    error?: string;
}