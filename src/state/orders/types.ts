export type Order = {
    _id: string;
    user?: {
        _id: string;
        name: string;
    };
    product: {
        _id: string;
        name: string;
    };
    productName: string;
    total: number;
    quantity: number;
    status: 'pending' | 'paid' | 'failed' | 'delivered' | 'cancelled';
    paymentIntentId?: string;
    // Customer information
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    createdAt: string;
    updatedAt: string;
};

export type CheckPurchaseResponse = {
    hasPurchased: boolean;
    order?: {
        _id: string;
        productName: string;
        total: number;
        quantity: number;
        createdAt: string;
        product: {
            _id: string;
            name: string;
            bookPath?: string;
            additionalDetails?: {
                shippingFormat?: string;
            };
        };
    };
};

export type GetOrdersSuccessResponse = {
    orders: Order[];
    total: number;
    page: number;
    totalPages: number;
};

export type OrderState = {
    isLoading: boolean;
    error?: string;
};
