interface BuyerReviewCardProps {
    buyerName: string;
    feedbackMark: number;
    reviewText: string;
    isVerifiedBuyer?: boolean;
    isFeatured?: boolean;
}

const BuyerReviewCard = ({
    buyerName,
    feedbackMark,
    reviewText,
    isVerifiedBuyer = false,
    isFeatured = false,
}: BuyerReviewCardProps) => {
    const fullStars = Math.floor(feedbackMark);
    const hasHalfStar = feedbackMark % 1 !== 0 && feedbackMark > fullStars;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className='relative bg-white pt-10 p-6 rounded-lg shadow-md flex-shrink-0 w-80 md:w-100'>
            {isFeatured && (
                <div className='absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md'>
                    <svg className='w-6 h-6 text-[#5D5DFF] fill-current' viewBox='0 0 24 24'>
                        <path d='M12 .587l3.668 7.424 8.204 1.191-5.946 5.792 1.406 8.165L12 18.256l-7.332 3.856 1.406-8.165-5.946-5.792 8.204-1.191L12 .587z' />
                    </svg>
                </div>
            )}
            {isVerifiedBuyer && (
                <div className='absolute top-4 right-4 flex items-center text-[#5D5DFF] text-sm font-semibold'>
                    <svg className='w-4 h-4 mr-1 fill-current' viewBox='0 0 24 24'>
                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                    </svg>
                    Verified buyer
                </div>
            )}
            <h3 className='text-2xl font-bold text-gray-800 mt-4 mb-2'>{buyerName}</h3>
            <div className='flex items-center mb-4'>
                {[...Array(fullStars)].map((_, i) => (
                    <svg key={`full-${i}`} className='w-5 h-5 text-[#F0C833] fill-current' viewBox='0 0 24 24'>
                        <path d='M12 .587l3.668 7.424 8.204 1.191-5.946 5.792 1.406 8.165L12 18.256l-7.332 3.856 1.406-8.165-5.946-5.792 8.204-1.191L12 .587z' />
                    </svg>
                ))}
                {hasHalfStar && (
                    <svg className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                        <defs>
                            <linearGradient id='half-star-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                                <stop offset='50%' stopColor='#F0C833' />
                                <stop offset='50%' stopColor='#626262' />
                            </linearGradient>
                        </defs>
                        <path fill='url(#half-star-gradient)' d='M12 .587l3.668 7.424 8.204 1.191-5.946 5.792 1.406 8.165L12 18.256l-7.332 3.856 1.406-8.165-5.946-5.792 8.204-1.191L12 .587z' />
                    </svg>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <svg key={`empty-${i}`} className='w-5 h-5 text-[#626262] fill-current' viewBox='0 0 24 24'>
                        <path d='M12 .587l3.668 7.424 8.204 1.191-5.946 5.792 1.406 8.165L12 18.256l-7.332 3.856 1.406-8.165-5.946-5.792 8.204-1.191L12 .587z' />
                    </svg>
                ))}
            </div>
            <p className='text-[#362925] leading-relaxed text-base'>{reviewText}</p>
        </div>
    );
};

export default BuyerReviewCard; 