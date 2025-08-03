import { createReducer } from '@reduxjs/toolkit';
import { getAllInteriorsBlogPostsAction } from './actions';
import { InteriorsState } from './types';

export const initialState: InteriorsState = {
    isLoading: false,
    blogPosts: []
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getAllInteriorsBlogPostsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAllInteriorsBlogPostsAction.fulfilled, (state, { payload }) => {
            state.blogPosts = payload;
            state.isLoading = false;
        })
        .addCase(getAllInteriorsBlogPostsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Failed to retrieve blog posts';
        })
);