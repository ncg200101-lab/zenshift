export type ReviewTypes = {
    _id: string;
    buyerName: string;
    feedbackMark: number;
    reviewText: string;
    isVerifiedBuyer?: boolean;
    isFeatured?: boolean;
    product: any;
    createdAt: string;
}

export type ShiftTypes =
    | 'Abundance'
    | 'Apothecary'
    | 'Interior'
    | 'Health'
    | 'Kids'
    | 'Masters'
    | 'Travels'
    | 'Academy'
    | 'Collectives'
    | 'Golf';

export type CategoryTypes =
    | 'abundance-field'
    | 'books-journals'
    | 'digital-codes'
    | 'frequency-drops'
    | 'apparel-accessories'
    | 'home-energy-tools'
    | 'journals-accessories'
    | 'mugs-drinkware'
    | 'energetic-atmosphere'
    | 'flow-mapping'
    | 'intentional-objects'
    | 'light-tone'
    | 'energy-immune-flow'
    | 'everyday-ascension-care'
    | 'gut-mood-harmony'
    | 'nervous-system-reset';

export type FrequencyColorTypes = 'Ocean' | 'Blue' | 'Purple' | 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Forest';

export type FrequencySizeTypes = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type FrequencyStyleTypes = 'Modern' | 'Rustic' | 'Minimalist';

export type FrequencyFitTypes = 'Slim' | 'Regular' | 'Relaxed';

export type ProductTypes = {
    _id: string;
    name: string;
    summary: string;
    description: string;
    shift: ShiftTypes;
    category: CategoryTypes;
    image: string;
    price: number;
    rating?: number;
    reviews: ReviewTypes[];
    frequencyInfo: {
        color: FrequencyColorTypes;
        size: FrequencySizeTypes;
        style: FrequencyStyleTypes;
        fit: FrequencyFitTypes;
    };
    additionalDetails?: {
        material?: string;
        care?: string;
        shippingFormat?: string;
        returns?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export type GetProductsResponse = {
    page: number;
    products: ProductTypes[];
    total: number;
    totalPages: number;
}

export type GetReviewsResponse = {
    page: number;
    reviews: ReviewTypes[];
    total: number;
    totalPages: number;
}

export type SortByTypes = 'alphabetical' | 'price' | 'newest' | 'oldest';

export type CuratedCategoryTypes = {
    imageSrc: string;
    title: string;
    shift: ShiftTypes;
    category: string;
}

export type ProductState = {
    isLoading: boolean;
    error?: string;
    curatedCategories: CuratedCategoryTypes[];
    reviews: ReviewTypes[];
}