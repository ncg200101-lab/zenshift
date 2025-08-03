import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllInteriorsBlogPostsService,
} from './services';
import { 
    BlogPostTypes,
} from '../global/types';
import { handleActionResponse } from '../global/actions';

export const getAllInteriorsBlogPostsAction = createAsyncThunk<
    BlogPostTypes[],
    void,
    { rejectValue: string }
>(
    'interiors/getAllBlogPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllInteriorsBlogPostsService();
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