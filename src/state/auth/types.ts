import { ErrorResponse, ActionResponse } from '../global/types';

export type { ErrorResponse };

export type SignInSuccessResponse = {
    token: string;
    user: {
        id: string;
        name?: string;
        email: string;
        role: 'user' | 'admin';
        avatar?: string;
    };
    message?: string;
}

export type SignInParams = {
    email: string;
    password: string;
}

export type SignUpSuccessResponse = {
    message?: string;
}

export type SignUpParams = {
    name: string;
    email: string;
    password: string;
}

export type ForgotPasswordSuccessResponse = {
    message?: string;
}

export type ForgotPasswordParams = {
    email: string;
}

export type ResetPasswordParams = {
    token: string;
    password: string;
}

export type VerifyEmailParams = {
    token: string;
}

export type ResetPasswordSuccessResponse = {
    message?: string;
}

export type VerifyEmailSuccessResponse = {
    message?: string;
}

export type UserTypes = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar: string;
    token: string;
}

export type UserState = {
    isLoading: boolean;
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar: string;
    token: string;
    error?: string;
}