export type Order = {
    _id: string;
    user: {
        _id: string;
        name: string;
    };
    product: {
        _id: string;
        name: string;
    };
    total: number,
    status: 'pending' | 'paid' | 'failed' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
};
  
export type OrderState = {
    isLoading: boolean;
    error?: string;
};
  
export type GetOrdersSuccessResponse = {
    page: number;
    orders: Order[];
    total: number;
    totalPages: number;
};
