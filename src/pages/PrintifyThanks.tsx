import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';

const PrintifyThanks = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClick = useCallback((link?: string) => () => {
        if (link) {
            navigate(link);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate]);

    return (
        <>
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Thank You! Your Custom Product is Being Created
                    </MainTitle>
                </motion.div>
                <Text className='mb-8'>
                    We've received your Printify order and it's now being processed. Your custom product will be created and shipped to you.
                    <br />
                    <i>You'll receive an email confirmation with tracking details once your order is ready to ship.</i>
                </Text>
                
                <div className='bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto'>
                    <SubTitle className='text-green-800 mb-2'>Order Details</SubTitle>
                    <Text className='text-green-700'>
                        Order ID: {id || 'Processing...'}
                        <br />
                        Status: Order Confirmed
                        <br />
                        Estimated Delivery: 7-14 business days
                    </Text>
                </div>
            </div>
            
            <div className='w-full h-[3px] bg-white'></div>
            
            <div className='container pb-12'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-center mb-8'
                >
                    <SubTitle>What's Next?</SubTitle>
                    <Text>
                        While your custom product is being created, explore more of our offerings or connect with our community.
                    </Text>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'
                >
                    <div className='text-center p-6 bg-white rounded-lg shadow-md'>
                        <div className='text-3xl mb-4'>🛍️</div>
                        <SubTitle className='mb-2'>Continue Shopping</SubTitle>
                        <Text className='mb-4'>
                            Explore more custom products and spiritual tools
                        </Text>
                        <FullWidthButton onClick={handleClick('/test')}>
                            Browse Products
                        </FullWidthButton>
                    </div>

                    <div className='text-center p-6 bg-white rounded-lg shadow-md'>
                        <div className='text-3xl mb-4'>🧘</div>
                        <SubTitle className='mb-2'>Join Our Community</SubTitle>
                        <Text className='mb-4'>
                            Connect with like-minded souls on your spiritual journey
                        </Text>
                        <FullWidthButton onClick={handleClick('/contact-us')}>
                            Get Connected
                        </FullWidthButton>
                    </div>

                    <div className='text-center p-6 bg-white rounded-lg shadow-md'>
                        <div className='text-3xl mb-4'>📧</div>
                        <SubTitle className='mb-2'>Stay Updated</SubTitle>
                        <Text className='mb-4'>
                            Get notified about new products and spiritual insights
                        </Text>
                        <FullWidthButton onClick={handleClick('/')}>
                            Back to Home
                        </FullWidthButton>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default PrintifyThanks;
