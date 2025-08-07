import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { handleActionResponse } from '../global/actions';
import {
    getProductByIdService,
    getAllProductsService,
    getReviewsByProductService,
    createProductService,
    updateProductService,
    deleteProductService,
    getBlogByIdService
} from './services';
import {
    ProductTypes,
    SortByTypes,
    GetProductsResponse,
    GetReviewsResponse,
    ShiftTypes,
    CategoryTypes,
    FrequencyColorTypes,
    FrequencyFitTypes,
    FrequencySizeTypes,
    FrequencyStyleTypes,
} from './types';
import { BlogPostTypes } from '../global/types';

export const getProductByIdAction = createAsyncThunk<
    ProductTypes,
    string,
    { rejectValue: string }
>(
    'product/getProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getProductByIdService(id);
            const result = handleActionResponse<ProductTypes>(
                response,
                'Get Product by id successfully',
                'Failed to get product'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }

            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to get product';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const getAllProductsAction = createAsyncThunk<
    GetProductsResponse,
    {
        shift?: ShiftTypes;
        category?: CategoryTypes;
        color?: FrequencyColorTypes;
        size?: FrequencySizeTypes;
        style?: FrequencyStyleTypes;
        fit?: FrequencyFitTypes;
        searchText?: string;
        page?: string;
        limit?: string;
        sortBy?: SortByTypes;
        includePrintify?: string;
    } | undefined,
    { rejectValue: string }
>(
    'product/getAllProducts',
    async (queries, { rejectWithValue }) => {
        try {
            const response = await getAllProductsService(queries);
            const result = handleActionResponse<GetProductsResponse>(
                response,
                'Get all products successfully',
                'Failed to get all products'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to get all products';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const getReviewsByProductAction = createAsyncThunk<
    GetReviewsResponse,
    string,
    { rejectValue: string }
>(
    'product/getReviewsByProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getReviewsByProductService(id);
            const result = handleActionResponse<GetReviewsResponse>(
                response,
                'Get reviews by product successfully',
                'Failed to get reviews by product'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to get reviews by product';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const createProductAction = createAsyncThunk<
    ProductTypes,
    FormData,
    { rejectValue: string }
>(
    'product/createProduct',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createProductService(data);
            const result = handleActionResponse<ProductTypes>(
                response,
                'Product created successfully',
                'Failed to create product'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to create product';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateProductAction = createAsyncThunk<
    ProductTypes,
    { id: string; data: FormData },
    { rejectValue: string }
>(
    'product/updateProduct',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateProductService(id, data);
            const result = handleActionResponse<ProductTypes>(
                response,
                'Product updated successfully',
                'Failed to update product'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to update product';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteProductAction = createAsyncThunk<
    { id: string },
    { id: string },
    { rejectValue: string }
>(
    'product/deleteProduct',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await deleteProductService(id);
            const result = handleActionResponse<{ id: string }>(
                response,
                'Product deleted successfully',
                'Failed to delete product'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to delete product';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);

export const getBlogByIdAction = createAsyncThunk<
    BlogPostTypes,
    string,
    { rejectValue: string }
>(
    'product/getBlogById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getBlogByIdService(id);
            const result = handleActionResponse<BlogPostTypes>(
                response,
                'Get blog by id successfully',
                'Failed to get blog'
            );
            if (typeof result === 'string') {
                return rejectWithValue(result);
            }
            return result;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to get blog';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);
