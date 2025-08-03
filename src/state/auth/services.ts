import { 
    SignInParams, 
    SignInSuccessResponse, 
    SignUpParams, 
    SignUpSuccessResponse,
    ForgotPasswordParams,
    ForgotPasswordSuccessResponse,
    ResetPasswordParams,
    ResetPasswordSuccessResponse,
    VerifyEmailParams,
    VerifyEmailSuccessResponse
} from './types';
import { makeApiCall, handleActionResponse, handleActionError } from '../global/api';
import { ApiError, ActionResponse } from '../global/types';

export const signInService = async (params: SignInParams): Promise<ActionResponse<SignInSuccessResponse>> => {
    try {
        const response = await makeApiCall('/api/auth/login', 'POST', { data: params });
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};

export const signUpService = async (params: SignUpParams): Promise<ActionResponse<SignUpSuccessResponse>> => {
    try {
        const response = await makeApiCall('/api/auth/register', 'POST', { data: params });
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};

export const forgotPasswordService = async (params: ForgotPasswordParams): Promise<ActionResponse<ForgotPasswordSuccessResponse>> => {
    try {
        const response = await makeApiCall('/api/auth/forgot-password', 'POST', { data: params });
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};

export const resetPasswordService = async (params: ResetPasswordParams): Promise<ActionResponse<ResetPasswordSuccessResponse>> => {
    try {
        const response = await makeApiCall('/api/auth/reset-password', 'POST', { data: params });
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};

export const verifyEmailService = async (params: VerifyEmailParams): Promise<ActionResponse<VerifyEmailSuccessResponse>> => {
    try {
        const response = await makeApiCall('/api/auth/verify-email', 'POST', { data: params });
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};