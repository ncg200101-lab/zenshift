export type CheckoutSessionResponse = {
    url: string;
};

export type SubscriptionsStatus = {
    plan?: 'basic' | 'premium' | null;
    status?: 'active' | 'inactive' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'canceled' | 'unpaid' | 'paused' | null;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
}

export type SubscriptionState = {
    isLoading: boolean;
    error?: string;
};