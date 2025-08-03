import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CategoryButton } from './Buttons';

interface ProductReviewProps {
    id: string;
    productName: string;
    productDetail: string;
    feedbackMark?: number;
}

const ProductReview = ({ id, productName, productDetail, feedbackMark = 0 }: ProductReviewProps) => {
    const navigate = useNavigate();

    const fullStars = Math.floor(feedbackMark);
    const hasHalfStar = feedbackMark % 1 !== 0 && feedbackMark > fullStars;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const handleClick = useCallback(() => {
        if (id) {
            navigate(`/product/${id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate, id]);

    return (
        <div className='p-8 w-full text-start pl-5 md:pl-20'>
            <h2 className='text-4xl font-bold text-[#362925] mb-2'>{productName}</h2>
            <p className='text-[#362925] text-lg mb-4'>{productDetail}</p>
            <div className='flex items-center mb-6'>
                {[...Array(fullStars)].map((_, i) => (
                    <svg key={`full-${i}`} className='w-6 h-6 text-[#F0C833] fill-current' viewBox='0 0 24 24'>
                        <path d='M12 .587l3.668 7.424 8.204 1.191-5.946 5.792 1.406 8.165L12 18.256l-7.332 3.856 1.406-8.165-5.946-5.792 8.204-1.191L12 .587z' />
                    </svg>
                ))}
                {hasHalfStar && (
                    <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
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
                    <svg key={`empty-${i}`} className='w-6 h-6 text-[#626262] fill-current' viewBox='0 0 24 24'>
                        <path d='M12 .587l3.668 7.424 8.204 1.191-5.946 5.792 1.406 8.165L12 18.256l-7.332 3.856 1.406-8.165-5.946-5.792 8.204-1.191L12 .587z' />
                    </svg>
                ))}
            </div>
            <div>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6 }}
            >
                <CategoryButton className='text-lg' onClick={handleClick}>
                    See What's Resonating Most
                </CategoryButton>
            </motion.div>
            </div>
        </div>
    );
};

export default ProductReview;
