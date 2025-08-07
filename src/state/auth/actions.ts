import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    signInService,
    signUpService,
    forgotPasswordService,
    resetPasswordService,
    verifyEmailService
} from './services';
import { 
    SignInParams,
    SignUpParams,
    ForgotPasswordParams,
    ResetPasswordParams,
    VerifyEmailParams,
    UserTypes,
    SignInSuccessResponse,
    SignUpSuccessResponse,
    ForgotPasswordSuccessResponse,
    ResetPasswordSuccessResponse,
    VerifyEmailSuccessResponse,
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

export const signInAction = createAsyncThunk<
    UserTypes,
    SignInParams,
    { rejectValue: string }
>(
    'user/signin',
    async (params, { rejectWithValue }) => {
        try {
            const response = await signInService(params);
            const result = handleActionResponse<SignInSuccessResponse>(
                response,
                'Login successful',
                'Login failed'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }

            return {
                id: result.user.id,
                name: result.user.name || '',
                email: result.user.email,
                role: result.user.role,
                avatar: result.user.avatar || '',
                token: result.token,
                subscription: result.user.subscription,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const signUpAction = createAsyncThunk<
    void,
    SignUpParams,
    { rejectValue: string }
>(
    'user/signup',
    async (params, { rejectWithValue }) => {
        try {
            const response = await signUpService(params);
            const result = handleActionResponse<SignUpSuccessResponse>(
                response,
                'Register successful',
                'Register failed'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Register failed';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const forgotPasswordAction = createAsyncThunk<
    void,
    ForgotPasswordParams,
    { rejectValue: string }
>(
    'user/forgotpassword',
    async (params, { rejectWithValue }) => {
        try {
            const response = await forgotPasswordService(params);
            const result = handleActionResponse<ForgotPasswordSuccessResponse>(
                response,
                'Forgot password successful',
                'Forgot password failed'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Forgot password failed';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const resetPasswordAction = createAsyncThunk<
    void,
    ResetPasswordParams,
    { rejectValue: string }
>(
    'user/resetpassword',
    async (params, { rejectWithValue }) => {
        try {
            const response = await resetPasswordService(params);
            const result = handleActionResponse<ResetPasswordSuccessResponse>(
                response,
                'Password reset successful',
                'Password reset failed'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const verifyEmailAction = createAsyncThunk<
    void,
    VerifyEmailParams,
    { rejectValue: string }
>(
    'user/verifyemail',
    async (params, { rejectWithValue }) => {
        try {
            const response = await verifyEmailService(params);
            const result = handleActionResponse<VerifyEmailSuccessResponse>(
                response,
                'Email verification successful',
                'Email verification failed'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Email verification failed';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const logoutAction = createAction('user/logout');

export const setUserFromSocial = createAction<UserTypes>('user/setUserFromSocial');