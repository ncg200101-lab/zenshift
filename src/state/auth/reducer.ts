import { createReducer } from '@reduxjs/toolkit';
import {
    signInAction,
    signUpAction,
    forgotPasswordAction,
    logoutAction,
    setUserFromSocial
} from './actions';
import { UserState } from './types';

export const initialState: UserState = {
    isLoading: false,
    id: '',
    name: '',
    email: '',
    role: 'user',
    avatar: '',
    token: '',
    error: '',
    subscription: {
        plan: undefined,
        status: undefined,
        stripeCustomerId: undefined,
        stripeSubscriptionId: undefined,
    },
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(signInAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(signInAction.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.id = payload.id;
            state.name = payload.name;
            state.email = payload.email;
            state.role = payload.role;
            state.avatar = payload.avatar;
            localStorage.setItem('token', payload.token || '');
            state.subscription = payload.subscription;
            state.token = payload.token;
        })
        .addCase(signInAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.id = '';
            state.name = '';
            state.email = '';
            state.role = 'user';
            state.avatar = '';
            state.token = '';
            localStorage.removeItem('token');
            state.error = payload as string || 'Login failed';
        })
        .addCase(signUpAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(signUpAction.fulfilled, (state, { payload }) => {
            state.isLoading = false;
        })
        .addCase(signUpAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Register failed';
        })
        .addCase(forgotPasswordAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(forgotPasswordAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Forgot password failed';
        })
        .addCase(logoutAction, (state) => {
            localStorage.removeItem('token');
            return initialState;
        })
        .addCase(setUserFromSocial, (state, { payload }) => {
            state.id = payload.id;
            state.name = payload.name;
            state.email = payload.email;
            state.avatar = payload.avatar;
            localStorage.setItem('token', payload.token || '');
            state.token = payload.token;
        })
);