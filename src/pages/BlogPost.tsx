import { useCallback, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../state/hooks';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text, Typography } from '../components/ui/Text';
import { getBlogByIdAction } from '../state/product/actions';
import { BlogPostTypes } from '../state/global/types';
import SpinLoader from '../components/ui/SpinLoader';
import { formatDate } from '../utils/dateUtils';

const BlogPost = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currectBlog, setCurrentBlog] = useState<BlogPostTypes | undefined>();

    function capitalize(str: string) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitLoading) return;

        try {
            setIsSubmitLoading(true);
            console.log('Submitting data:', email);
        } catch(e) {
            console.error(e);
        } finally {
            setIsSubmitLoading(false);
        }
    }, [isSubmitLoading, email]);

    useEffect(() => {
        const fetchBlog = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const result = await dispatch(getBlogByIdAction(id)).unwrap();
                    setCurrentBlog(result);
                } catch(e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchBlog();
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <SpinLoader className='flex-grow' size={50} />
        );
    }

    if (!currectBlog) {
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
            <div className='absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] top-[60px] md:top-[80px] right-0 -z-[1] translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/light-blue-chakra.png' alt='' />
            </div> 
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <div className='mb-6 md:mb-12'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='mb-8 md:mb-16'
                    >
                        <MainTitle>
                            {currectBlog.title}
                        </MainTitle>
                    </motion.div>
                    <Text className='mb-6'>
                        <i>A frequency drop from the ZenShift Field</i>
                    </Text>
                    <p className='font-lato text-lg md:text-xl'>
                        <span><b>Date:</b> {formatDate(currectBlog.createdAt)}</span>
                        <br />
                        <span><b>Blog:</b> ZenShift {capitalize(currectBlog.vertical)}</span>
                    </p>
                </div>
                <div className='mb-6 md:mb-12'>
                    <div className='w-full sm:w-2/3 max-w-2xl mx-auto'>
                        <img className='w-full' src={currectBlog.imageSrc?.[0] || ''} alt={currectBlog.title} />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 text-left mb-12 md:max-w-[1200px] mx-auto'>
                    <div className='flex-grow'>
                        <div className='space-y-4 md:space-y-8 mb-6 md:mb-12'>
                            <Text className='text-gray-700'>
                                {currectBlog.description}
                            </Text>
                        </div>
                    </div>
                </div>
                <div>
                    <SubTitle className='mb-6 md:mb-12'>
                        Wants More Insight In Your Inbox
                    </SubTitle>
                    <div className='email-form'>
                        <form className='flex flex-col md:flex-row gap-6' onSubmit={handleSubmit}>
                            <div className='w-full'>
                                <label htmlFor='email' className='sr-only'>Email Address</label>
                                <input 
                                    type='email' 
                                    id='email' 
                                    name='email' 
                                    placeholder='Email Address' 
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <FullWidthButton type='submit'>
                                Get Insight
                            </FullWidthButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BlogPost ;