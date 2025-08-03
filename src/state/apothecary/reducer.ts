import { createReducer } from '@reduxjs/toolkit';
import { getAllApothecaryBlogPostsAction } from './actions';
import {
    ApothecaryState,
    ApothecaryToolTypes,
} from './types';

const initialApothecaryTools: ApothecaryToolTypes[] = [
    {
        src: '/assets/products/product-1.png',
        title: 'Energy Shield'
    },
    {
        src: '/assets/products/product-2.png',
        title: 'Mugs'
    },
    {
        src: '/assets/products/product-3.png',
        title: 'Shirt'
    },
    {
        src: '/assets/products/product-1.png',
        title: 'Energy Shield'
    },
    {
        src: '/assets/products/product-2.png',
        title: 'Mugs'
    },
    {
        src: '/assets/products/product-3.png',
        title: 'Shirt'
    }
];

export const initialState: ApothecaryState = {
    isLoading: false,
    blogPosts: [],
    featuredTools: initialApothecaryTools,
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getAllApothecaryBlogPostsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAllApothecaryBlogPostsAction.fulfilled, (state, { payload }) => {
            state.blogPosts = payload;
            state.isLoading = false;
        })
        .addCase(getAllApothecaryBlogPostsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Failed to retrieve blog posts';
        })
);