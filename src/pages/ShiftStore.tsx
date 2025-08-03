import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { RootState } from '../state/store';
import { VerticalsButton } from '../components/ui/Buttons';
import CuratedCard from '../components/ui/CuratedCard';
import ProductReview from '../components/ui/ProductReview';
import BuyerReviewCard from '../components/ui/BuyerReviewCard';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import { ProductTypes, ReviewTypes, CuratedCategoryTypes } from '../state/product/types';
import { getAllProductsAction } from '../state/product/actions';
import SpinLoader from '../components/ui/SpinLoader';

const ShiftStore = () => {
    const dispatch = useAppDispatch();

    const { curatedCategories, reviews } = useAppSelector((state: RootState) => state.product);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductTypes[]>([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true);
            try {
                const physical = await dispatch(getAllProductsAction({ limit: '2' })).unwrap();
                setProducts(physical.products || []);
            } catch(e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
      }, [dispatch]);

    if (isLoading) {
        return (
            <SpinLoader className='flex-grow' size={50} />
        );
    }

    return (
        <>
            <div className='container pt-18 md:pt-36 pb-12'>
                <div className='flex flex-col md:flex-row md:items-center space-x-4 rounded-lg overflow-hidden'>
                    <div className='w-full md:w-3/5 text-left'>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className='mb-8 md:mb-16'
                        >
                            <MainTitle>
                                Shift Your Style
                                <br />
                                Shift Your Frequency.
                            </MainTitle>
                        </motion.div>
                        <Text className='mb-4 md:mb-8'>
                            From chakra dot mugs to high-vibe journals, everything in The Shift Store is created to carry the frequency of your next-level self.
                        </Text>
                        <div className='flex justify-center'>
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.4 }}
                            >
                                <VerticalsButton color='#BC8FEF'>
                                    Enter the Field
                                </VerticalsButton>
                            </motion.div>
                        </div>
                    </div>
                    <div className='flex hidden md:flex md:w-2/5 aspect-square justify-center md:justify-center items-center animate-float'>
                        <img src='/assets/products/shirt.png' alt='Featured Product' />
                    </div>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-12 md:mb-24'>
                    Shop By Category
                </SubTitle>
                <div className='curated-category max-w-[1056px] mx-auto flex justify-around flex-wrap gap-8'>
                    {curatedCategories.map((category: CuratedCategoryTypes, index: number) => (
                        <CuratedCard
                            key={index}
                            imageSrc={category.imageSrc}
                            title={category.title}
                            category={category.category}
                            tooltip={`Learn more about ${category.title}`}
                        />
                    ))}
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-6 md:mb-12'>
                    Best Sellers
                </SubTitle>
                <div className='flex flex-col justify-center gap-y-6'>
                    {products.map((product: ProductTypes, index: number) => (
                        <div key={index} className='flex flex-col md:flex-row items-center p-2 bg-white rounded-3xl'>
                            <img
                                className='bg-white w-2/3 sm:w-1/2 md:w-1/3 rounded-3xl'
                                src={product.image}
                                alt={product.name}
                            />
                            <ProductReview
                                id={product._id}
                                productName={product.name}
                                productDetail={product.description || ''}
                                feedbackMark={product.rating}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-12 md:py-24 text-center'
            >
                <SubTitle className='mb-12'>
                    Made to Move Energy
                </SubTitle>
                <Text>
                    Here's what aligned souls are feeling…
                </Text>
                <div className='chakra-row'>
                    <div className='chakra-small-circle red'></div>
                    <div className='chakra-small-circle orange'></div>
                    <div className='chakra-small-circle yellow'></div>
                    <div className='chakra-small-circle green'></div>
                    <div className='chakra-small-circle blue'></div>
                    <div className='chakra-small-circle indigo'></div>
                    <div className='chakra-small-circle purple'></div>
                </div>
                <div className='py-8 px-0 sm:px-4 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center'>
                        {reviews.map((review: ReviewTypes, index: number) => (
                            <BuyerReviewCard
                                key={index}
                                buyerName={review.buyerName}
                                feedbackMark={review.feedbackMark}
                                reviewText={review.reviewText}
                                isVerifiedBuyer={review.isVerifiedBuyer}
                                isFeatured={review.isFeatured}
                            />
                        ))}
                    </div>
                </div>
            </div>
            </motion.div>
        </>
    );
}

export default ShiftStore;