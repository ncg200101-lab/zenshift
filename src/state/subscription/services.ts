import { makeApiCall, handleActionResponse, handleActionError } from '../global/api';
import type { ApiError, ActionResponse } from '../global/types';
import type {
    CheckoutSessionResponse,
    SubscriptionsStatus
} from './types';

export const createCheckoutSessionService = async (
    data: { plan: 'basic' | 'premium' }
): Promise<ActionResponse<CheckoutSessionResponse>> => {
    try {
        const response = await makeApiCall<CheckoutSessionResponse>(
            '/api/subscription/create-checkout-session',
            'POST',
            { data }
        );
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};

export const getSubscriptionStatusService = async (): Promise<ActionResponse<SubscriptionsStatus>> => {
    try {
        const response = await makeApiCall<SubscriptionsStatus>(
            `/api/subscription/status`,
            'GET',
        );
        return handleActionResponse(response);
    } catch (error) {
        return handleActionError(error as ApiError);
    }
};