import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../state/hooks';
import { ReviewTypes, ProductTypes } from '../state/product/types';
import { getProductByIdAction, getReviewsByProductAction } from '../state/product/actions';
import { LargeFilledButton } from '../components/ui/Buttons';
import BuyerReviewCard from '../components/ui/BuyerReviewCard';
import { SubTitle, Text, Typography } from '../components/ui/Text';
import SpinLoader from '../components/ui/SpinLoader';

const ProductDetailPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [currectProduct, setCurrentProduct] = useState<ProductTypes | undefined>();
    const [currentReviews, setCurrentReviews] = useState<ReviewTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        navigate(`/checkout/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate, id]);
  
    useEffect(() => {
        const fetchProductAndReviews = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const [product, reviews] = await Promise.all([
                        dispatch(getProductByIdAction(id)).unwrap(),
                        dispatch(getReviewsByProductAction(id)).unwrap(),
                    ]);

                    setCurrentProduct(product);
                    setCurrentReviews(reviews.reviews);
                } catch(e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchProductAndReviews();
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <SpinLoader className='flex-grow' size={50} />
        );
    }

    if (!currectProduct) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <Typography className='text-gray-500'>
                    Product not found
                </Typography>
            </div>
        );
    }

    return (
        <>
            <div className='bg-[#F9F4EE] py-12 relative'>
                <div className='container text-center w-full'>
                    <div className='relative flex justify-center w-80 sm:w-96 md:w-150 mx-auto'>
                        <img
                            src={currectProduct?.image}
                            alt={currectProduct?.name || ''}
                            width='w-full'
                        />
                    </div>
                    <p className='text-2xl font-medium'>
                        Everything holds frequency. This one is tuned to yours.
                    </p>
                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                        <LargeFilledButton onClick={handleClick}>
                            Add To Cart
                        </LargeFilledButton>
                    </div>
                </div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container pt-12 md:pt-24 pb-6 md:pb-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Product Description
                </SubTitle>
                <Text className='text-left'>
                    {currectProduct?.description || ''}
                </Text>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Frequendcy Info
                </SubTitle> 
                <table className='bg-[#DED6C0] w-full max-w-4xl mx-auto border-t border-b border-[#8B8678]'>
                    <tbody>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Color:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.frequencyInfo?.color || ''}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Size:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.frequencyInfo?.size || ''}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Style:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.frequencyInfo?.style || ''}
                            </td>
                        </tr>
                        <tr className='text-left '>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Fit:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.frequencyInfo?.fit || ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <SubTitle className='mb-6'>
                    What are other People Saying
                </SubTitle> 
                <Text className='mb-12'>
                    See how this shifted their space.
                </Text>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4 justify-items-center'>
                        {!currentReviews || currentReviews.length === 0 ? (
                            <div className='col-span-full flex items-center justify-center py-8'>
                                <Typography className='text-gray-500'>
                                    No reviews yet. Be the first to share your experience!
                                </Typography>
                            </div>
                        ) : (
                            currentReviews.map((review: ReviewTypes, index: number) => (
                                <BuyerReviewCard
                                    key={index}
                                    buyerName={review.buyerName}
                                    feedbackMark={review.feedbackMark}
                                    reviewText={review.reviewText}
                                    isVerifiedBuyer={review.isVerifiedBuyer}
                                    isFeatured={review.isFeatured}
                                />
                            ))
                        )}
                    </div>
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Additional Details
                </SubTitle> 
                <table className='bg-[#DED6C0] w-full max-w-4xl mx-auto border-t border-b border-[#8B8678]'>
                    <tbody>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Size / Material:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.additionalDetails?.material || ''}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Care:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.additionalDetails?.care || ''}
                            </td>
                        </tr>
                        <tr className='text-left border-b border-[#8B8678]'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Shipping Format:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.additionalDetails?.shippingFormat || ''}
                            </td>
                        </tr>
                        <tr className='text-left'>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                Returns:
                            </td>
                            <td className='font-lato py-4 px-3 text-black text-xl md:text-3xl'>
                                {currectProduct?.additionalDetails?.returns || ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>
        </>
    );
}

export default ProductDetailPage;