import { createReducer } from '@reduxjs/toolkit';
import { ProductState, ReviewTypes, CuratedCategoryTypes } from './types';
import {
    getAllProductsAction,
    getProductByIdAction,
    getReviewsByProductAction,
    createProductAction,
    updateProductAction,
    deleteProductAction
} from './actions';

const initialCuratedCategories: CuratedCategoryTypes[] = [
    {
        imageSrc: '/assets/abundance/abundance-field.jpg',
        title: 'Abundance Field',
        shift: 'Abundance',
        category: 'abundance-field',
    },
    {
        imageSrc: '/assets/abundance/books-journals.jpg',
        title: 'Books & Journals',
        shift: 'Abundance',
        category: 'books-journals',
    },
    {
        imageSrc: '/assets/abundance/digital-codes.jpg',
        title: 'Digital Codes',
        shift: 'Abundance',
        category: 'digital-codes',
    },
    {
        imageSrc: '/assets/abundance/frequency-drops.jpg',
        title: 'Frequency Drops',
        shift: 'Abundance',
        category: 'frequency-drops',
    },
    {
        imageSrc: '/assets/apothecary/apparel-accessories.jpg',
        title: 'Apparel & Accessories',
        shift: 'Apothecary',
        category: 'apparel-accessories',
    },
    {
        imageSrc: '/assets/apothecary/home-energy-tools.jpg',
        title: 'Home Energy Tools',
        shift: 'Apothecary',
        category: 'home-energy-tools',
    },
    {
        imageSrc: '/assets/apothecary/journals-accessories.jpg',
        title: 'Journals & Accessories',
        shift: 'Apothecary',
        category: 'journals-accessories',
    },
    {
        imageSrc: '/assets/apothecary/mugs-drinkware.jpg',
        title: 'Mugs & Drinkware',
        shift: 'Apothecary',
        category: 'mugs-drinkware',
    },
    {
        imageSrc: '/assets/interiors/energetic-atmosphere.jpg',
        title: 'Energetic Atmosphere',
        shift: 'Interior',
        category: 'energetic-atmosphere',
    },
    {
        imageSrc: '/assets/interiors/flow-mapping.jpg',
        title: 'Flow Mapping',
        shift: 'Interior',
        category: 'flow-mapping',
    },
    {
        imageSrc: '/assets/interiors/intentional-objects.jpg',
        title: 'Intentional Objects',
        shift: 'Interior',
        category: 'intentional-objects',
    },
    {
        imageSrc: '/assets/interiors/light-tone.jpg',
        title: 'Light & Tone',
        shift: 'Interior',
        category: 'light-tone',
    },
    {
        imageSrc: '/assets/health/energy-immune-flow.jpg',
        title: 'Energy Immune Flow',
        shift: 'Health',
        category: 'energy-immune-flow',
    },
    {
        imageSrc: '/assets/health/everyday-ascension-care.jpg',
        title: 'Everyday Ascension Care',
        shift: 'Health',
        category: 'everyday-ascension-care',
    },
    {
        imageSrc: '/assets/health/gut-mood-harmony.jpg',
        title: 'Gut & Mood Harmony',
        shift: 'Health',
        category: 'gut-mood-harmony',
    },
    {
        imageSrc: '/assets/health/nervous-system-reset.jpg',
        title: 'Nervous System Reset',
        shift: 'Health',
        category: 'nervous-system-reset',
    },
];

const initialReviews: ReviewTypes[] = [
    {
        _id: '',
        buyerName: 'Sarah M',
        feedbackMark: 5,
        reviewText:
            'This mug has become my daily touchstone. The moment I hold it, I feel a gentle shift toward calm and clarity. It\'s beautifully crafted, and sipping my morning tea from it feels like a quiet ritual that grounds my heart and mind.',
        isVerifiedBuyer: true,
        isFeatured: false,
        createdAt: '2024-03-15',
        product: 0,
    },
    {
        _id: '',
        buyerName: 'James T',
        feedbackMark: 3.5,
        reviewText:
            'I wasn\'t sure a mug could feel so special, but this one does. It\'s like it carries a subtle energy that makes my coffee breaks feel sacred. The design is sleek, and it\'s become my go-to for moments of reflection.',
        isVerifiedBuyer: true,
        isFeatured: true,
        createdAt: '2024-03-14',
        product: 0,
    },
];

export const initialState: ProductState = {
    curatedCategories: initialCuratedCategories,
    reviews: initialReviews,
    isLoading: false,
    error: '',
};

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getAllProductsAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getAllProductsAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getAllProductsAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(getProductByIdAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getProductByIdAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getProductByIdAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(getReviewsByProductAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getReviewsByProductAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getReviewsByProductAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(createProductAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(createProductAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(createProductAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(updateProductAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(updateProductAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(updateProductAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(deleteProductAction.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(deleteProductAction.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteProductAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
);