import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { handleActionResponse } from '../global/actions';
import {
    createCheckoutSessionService,
    getSubscriptionStatusService,
} from './services';
import type {
    CheckoutSessionResponse,
    SubscriptionsStatus
} from './types';

export const createCheckoutSessionAction = createAsyncThunk<
    CheckoutSessionResponse,
    { plan: 'basic' | 'premium' },
    { rejectValue: string }
>(
    'subscription/createCheckoutSession',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createCheckoutSessionService(data);
            const result = handleActionResponse<CheckoutSessionResponse>(
                response,
                'Create checkout session successfully',
                'Failed to create checkout session'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to create checkout session';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const getSubscriptionStatusAction = createAsyncThunk<
    SubscriptionsStatus,
    void,
    { rejectValue: string }
>(
    'subscription/getSubscriptionStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSubscriptionStatusService();
            const result = handleActionResponse<SubscriptionsStatus>(
                response,
                'Get subscription status successfully',
                'Failed to get subscription status'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to get subscription status';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);
