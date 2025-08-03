import { useCallback, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FullWidthButton, ThanksButton } from '../components/ui/Buttons';
import { useAppDispatch } from '../state/hooks';
import { MainTitle, SubTitle, Typography, Text } from '../components/ui/Text';
import SocialIcons from '../components/ui/SocialIcons';
import { getProductByIdAction } from '../state/product/actions';
import { ProductTypes } from '../state/product/types';
import SpinLoader from '../components/ui/SpinLoader';

const Thanks = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [currectProduct, setCurrentProduct] = useState<ProductTypes | undefined>();

    const handleClick = useCallback((link?: string) => () => {
        if (link) {
            navigate(link);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate]);

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitLoading) return;

        try {
            setIsSubmitLoading(true);
            console.log('Submitting data:', email);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch(e) {
            console.error(e);
        } finally {
            setIsSubmitLoading(false);
        }
    }, [isSubmitLoading, email]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const product = await dispatch(getProductByIdAction(id)).unwrap();
                    setCurrentProduct(product);
                } catch(e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchProduct();
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
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Thank You, Your Frequency Shift is on its Way
                    </MainTitle>
                </motion.div>
                <Text>
                    We've received your order and you'll get an email confirmation shortly. Until then, breathe it in—you just said yes to something aligned.
                    <br />
                    <i>We don't take that lightly. Your field just shifted—and we're honored to be part of it.</i>
                </Text>
            </div>
            <div className='w-full h-[3px] bg-white'></div>
            <div className='container py-6 md:py-12'>
                <SubTitle className='mb-12'>
                    Order Summary
                </SubTitle>
                <div>
                    <div className='bg-[#E8E0C7] rounded-4xl flex flex-col md:flex-row items-center'>
                        <img
                            src={currectProduct?.image}
                            alt={currectProduct?.name || ''}
                            className='rounded-4xl p-3 md:p-5 w-full h-full object-contain md:w-1/3'
                        />
                        <div className='flex flex-col text-start w-full md:w-2/3 pt-10 md:pt-15 px-10 md:px-15'>
                            <h3 className='font-lato text-3xl'>
                                {currectProduct?.name || ''}
                            </h3>
                            <p className='font-lato text-xl my-1 md:my-2'>
                                <i>This mug is designed to hold resonance-sip slowly, stay aligned.</i>
                            </p>
                            <h4 className='font-lato text-xl font-bold my-1 md:my-2'>
                                ${currectProduct?.price?.toFixed(2) || 0}
                            </h4>
                            <div className='w-[50px] md:w-[70px] bg-white text-center my-2 md:my-5'>
                                1
                            </div>
                            <p className='font-lato text-xl my-1 md:my-2'>
                                Your shift vessel is preparing to land.
                            </p>
                            <h4 className='font-lato text-xl font-bold my-1 md:my-2'>
                                Tracking Details:
                            </h4>
                            <p className='font-lato text-xl my-1 md:my-2 pb-10'>
                                Order Placed - Packaged - Shipped
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container py-6 md:py-12 text-center'>
                <SubTitle className='mb-12'>
                    Where Is Your Energy Leading You Next?
                </SubTitle>
                <div className='items-center px-6 md:px-15 space-y-6'>
                    <ThanksButton color='#E8E0C7' onClick={handleClick('/abundance')}>
                        ZenShift Abundance
                    </ThanksButton>
                    <ThanksButton color='#E8E0C7' onClick={handleClick('/health')}>
                        ZenShift Health
                    </ThanksButton>
                    <ThanksButton color='#E8E0C7' onClick={handleClick('/interiors')}>
                        ZenShift Interior
                    </ThanksButton>
                </div>
            </div>
            <div className='container py-6 md:py-12 text-center'>
                <SubTitle className='mb-12'>
                    Want to keep shifting? Get free tools, practices, and frequency maps.
                </SubTitle>
                <div className='email-form mb-12'>
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='sr-only'>Email Address</label>
                            <input 
                                type='email' 
                                id='email' 
                                name='email' 
                                placeholder='Email'
                                required
                                value={email}
                                onChange={handleEmailChange}
                                className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.6 }}
                        >
                            <FullWidthButton type='submit'>
                                Yes, send me ZenShift Support
                            </FullWidthButton>
                        </motion.div>
                    </form>
                </div>
                <div className='chakra-row'>
                    <div className='chakra-circle red'></div>
                    <div className='chakra-circle orange'></div>
                    <div className='chakra-circle yellow'></div>
                    <div className='chakra-circle green'></div>
                    <div className='chakra-circle blue'></div>
                    <div className='chakra-circle indigo'></div>
                    <div className='chakra-circle purple'></div>
                </div>
                <div className='bg-[#E8E0C7] py-2 px-4'>
                    <h1 className='font-playfair text-[#362925] text-4xl md:text-6xl tracking-normal'>
                        ' You Are Part of Something bigger. Zenshift is a return, not a trend
                    </h1>
                    <p className='font-lato text-xl my-1 md:my-2'>
                        <i>This is a return to alignment. You are right on time.</i>
                    </p>
                </div>
                <h1 className='font-playfair mb-5 text-[#362925] mt-6 md:mt-12 text-2xl md:text-4xl font-bold'>
                    Keep Shifting With Us @ZenShift
                </h1>
                <SocialIcons />
            </div>
        </>
    );
}

export default Thanks;