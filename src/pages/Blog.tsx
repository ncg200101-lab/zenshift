import { useCallback, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../state/hooks';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text, Typography } from '../components/ui/Text';
import { getJournalByIdAction } from '../state/journal/actions';
import { JournalTypes } from '../state/journal/types';
import SpinLoader from '../components/ui/SpinLoader';
import { formatDate } from '../utils/dateUtils';

const popularPostsItems = [
    {
        src: '/assets/products/product-4.png',
        category: 'PRODUCT',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        src: '/assets/products/product-4.png',
        category: 'PRODUCT | ENTERPRISE',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        src: '/assets/products/product-4.png',
        category: 'PRODUCTIVITY',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        src: '/assets/products/product-4.png',
        category: 'PRODUCTIVITY',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
];

const articleItems = [
    {
        src: '/assets/products/product-5.png',
        category: 'Product',
        time: '4 Minute Read',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem',
    },
    {
        src: '/assets/products/product-5.png',
        category: 'Product',
        time: '6 Minute Read',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan,',
    },
    {
        src: '/assets/products/product-5.png',
        category: 'Productivity',
        time: '7 Minute Read',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem',
    },
    {
        src: '/assets/products/product-5.png',
        category: 'Productivity',
        time: '7 Minute Read',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus',
    },
]

const BlogPost = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currectJournal, setCurrentJournal] = useState<JournalTypes | undefined>();

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
        const fetchJournal = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const result = await dispatch(getJournalByIdAction(id)).unwrap();
                    setCurrentJournal(result);
                } catch(e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchJournal();
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <SpinLoader className='flex-grow' size={50} />
        );
    }

    if (!currectJournal) {
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
                            {currectJournal.title}
                        </MainTitle>
                    </motion.div>
                    <Text className='mb-6'>
                        <i>A frequency drop from the ZenShift Field</i>
                    </Text>
                    <p className='font-lato text-lg md:text-xl'>
                        <span className='mr-2'><b>Author:</b> {currectJournal.author.name}</span>
                        <span><b>Date:</b> {formatDate(currectJournal.createdAt)}</span>
                        <br />
                        <span><b>Vaticals:</b> ZenShift {capitalize(currectJournal.shift)}</span>
                    </p>
                </div>
                <div className='mb-6 md:mb-12'>
                    <div className='w-full sm:w-2/3 max-w-2xl mx-auto'>
                        <img className='w-full' src={currectJournal.image || ''} alt={currectJournal.title} />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 text-left mb-12'>
                    <div className='flex-grow'>
                        <div className='space-y-4 md:space-y-8 mb-6 md:mb-12'>
                            <Text>
                                Your home is more than a place to live—it's a canvas for your energy. At ZenShiftInteriors, we believe in crafting spaces that resonate with your soul's frequency, fostering peace, clarity, and connection. Whether it's a quiet corner for meditation or a vibrant living area that radiates abundance, every space can become sacred with intention.
                            </Text>
                            <div>
                                <Typography className='text-left mb-4'>
                                    Three Pillars of ZenShiftInteriors
                                </Typography>
                                <ul className='pl-6 list-disc'>
                                    <li>
                                        <Text>
                                            Energy Flow: Arrange your space to align with natural energy currents, using chakra-inspired layouts and space-clearing techniques.
                                        </Text>
                                    </li>
                                    <li>
                                        <Text>
                                            Intuitive Design: Choose colors, textures, and objects that feel like an extension of your inner calm.
                                        </Text>
                                    </li>
                                    <li>
                                        <Text>
                                            Sacred Anchors: Incorporate meaningful items—like our ZenShift Mug or curated affiliate tools—that hold space for mindfulness.
                                        </Text>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Typography className='text-left mb-4'>
                                    Why It Matters
                                </Typography>
                                <Text>
                                    A sacred space isn't about perfection—it's about presence. When you step into a room that's been intentionally designed, you feel it: a subtle shift, a moment of stillness. Our ZenShiftInteriors products, from digital guides to chakra-inspired decor, are crafted to help you create these moments effortlessly.
                                </Text>
                            </div>
                            <div>
                                <Typography className='text-left mb-4'>
                                    How to Begin
                                </Typography>
                                <Text>
                                    Start small. Choose one corner of your home and infuse it with intention. Light a candle, play soft music, and use our&nbsp;
                                    <a href='/interiors'>ZenShiftInteriors tools</a>
                                    &nbsp;to guide your journey. Whether it's our Space Clearing Guide or a ZenShift Mug to anchor your morning ritual, every step brings you closer to a home that feels like a sanctuary.
                                </Text>
                            </div>
                        </div>
                        <div className=''>
                            <h4 className='text-sm text-[#42526E] uppercase mb-8'>
                                Here are some related articles you may find interesting:
                            </h4>
                            <div className='space-y-8'>
                                {articleItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className='flex flex-col md:flex-row items-center gap-4 md:gap-6'
                                    >
                                        <div className='w-0 min-w-[300px]'>
                                            <img className='w-full' src={item.src} alt='' />
                                        </div>
                                        <div>
                                            <p className='text-sm font-lato text-[#42526E] uppercase mb-4'>
                                                <span className='mr-4'>{item.category}</span>
                                                <span>{item.time}</span>
                                            </p>
                                            <h4 className='text-xl md:text-2xl font-lato text-[#172B4D] mb-2'>
                                                {item.title}
                                            </h4>
                                            <p className='text-base text-lg font-lato text-[#172B4D]'>
                                                {item.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-0 sm:min-w-[380px]'>
                        <Text className='uppercase'>
                            Popular Posts
                        </Text>
                        <div className='text-left'>
                            {popularPostsItems.map((item, index) => (
                                <div key={index} className='flex items-center gap-4 py-4 border-b border-[#172B4D]'>
                                    <div className='w-0 min-w-[120px]'>
                                        <img src={item.src} alt='' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-segoe-ui text-[#42526E] mb-2'>
                                            {item.category}
                                        </p>
                                        <p className='text-lg font-segoe-ui text-[#172B4D]'>
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
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