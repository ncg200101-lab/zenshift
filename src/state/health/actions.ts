import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllHealthBlogPostsService,
} from './services';
import { 
    BlogPostTypes,
} from '../global/types';
import { handleActionResponse } from '../global/actions';

export const getAllHealthBlogPostsAction = createAsyncThunk<
    BlogPostTypes[],
    void,
    { rejectValue: string }
>(
    'health/getAllBlogPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllHealthBlogPostsService();
            const result = handleActionResponse<BlogPostTypes[]>(
                response,
                'Blog posts retrieved successfully',
                'Failed to retrieve blog posts'
            );

            if (typeof result === 'string') {
                return rejectWithValue(result);
            }

            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve blog posts';
            toast.error(errorMessage, { autoClose: 2000 });
            return rejectWithValue(errorMessage);
        }
    }
);