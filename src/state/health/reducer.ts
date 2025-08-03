import { createReducer } from '@reduxjs/toolkit';
import { getAllHealthBlogPostsAction } from './actions';
import { HealthState, RecommendedResourceTypes } from './types';

const initialRecommendedResources: RecommendedResourceTypes[] = [
    {
        src: '/assets/chakra/orange.svg',
        title: 'Adrenal Support formulas'
    },
    {
        src: '/assets/chakra/pink.svg',
        title: 'Energy medicine books/devices'
    },
    {
        src: '/assets/chakra/green.svg',
        title: 'PEMF mats'
    },
    {
        src: '/assets/chakra/yellow.svg',
        title: 'Breath Work Guide'
    }
];

export const initialState: HealthState = {
    isLoading: false,
    blogPosts: [],
    recommendedResources: initialRecommendedResources,
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getAllHealthBlogPostsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAllHealthBlogPostsAction.fulfilled, (state, { payload }) => {
            state.blogPosts = payload;
            state.isLoading = false;
        })
        .addCase(getAllHealthBlogPostsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload || 'Failed to retrieve blog posts';
        })
);