import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InsideCard from '../components/ui/InsideCard';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import ConvertKitForm from '../components/ui/ConvertKitForm';

interface ZenshiftCategoryProps {
    title?: string;
    text?: string;
    image: string;
    link?: string;
}

const activeZenshiftCategoryLists: ZenshiftCategoryProps[] = [
    {
        title: 'ZenShift Abundance',
        text: 'Wealth is Frequency Tap In',
        image: '/assets/categories/zen_abundance.jpg',
        link: 'Abundance'
    },
    {
        title: 'ZenShift Apothecary',
        text: 'Plant tools, Frequency codes, Affiliate-powered',
        image: '/assets/categories/zen_aprothecary.jpg',
        link: 'Apothecary'
    },
    {
        title: 'ZenShift Interior',
        text: 'Shift Your Surroundings Shift Your Life',
        image: '/assets/categories/zen_interior.jpg',
        link: 'Interiors'
    },
    {
        title: 'ZenShift Health',
        text: 'Your Body is an energy field Treat it like one',
        image: '/assets/categories/zen_health.jpg',
        link: 'Health'
    },
];

const comingZenshiftCategoryLists: ZenshiftCategoryProps[] = [
    {
        title: 'ZenShift Kids',
        image: '/assets/categories/zen_coming_kids.jpg'
    },
    {
        title: 'ZenShift Masters',
        image: '/assets/categories/zen_coming_masters.jpg'
    },
    {
        title: 'ZenShift Travel',
        image: '/assets/categories/zen_coming_travels.jpg'
    },
    {
        title: 'ZenShift Academy',
        image: '/assets/categories/zen_coming_academy.jpg'
    },
    {
        title: 'ZenShift Collective',
        image: '/assets/categories/zen_coming_collective.jpg'
    },
    {
        title: 'ZenShift Golf',
        image: '/assets/categories/zen_coming_golf.jpg'
    },
];

const FreebieLib = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }, []);

    const handleAccessSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        try {
            setIsLoading(true);
            console.log('Submitting data: ', email);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [email, isLoading]);

    const handleClick = useCallback((portal?: string) => () => {
        // if (link) {
            navigate('/freebie-library');
            navigate('/freebie-library', { state: { portal } });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        // }
    }, [navigate]);

    return (
        <>
            <div className='absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-[60px] md:top-[80px] left-0 -z-[1] -translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/blue-chakra.png' alt='' />
            </div>
            <div className='absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] top-[100px] right-0 -z-[1] translate-x-[50%] -translate-y-[50%] animate-opacity'>
                <img src='/assets/loader-images/light-blue-chakra.png' alt='' />
            </div>
            <div className='container py-12 md:py-24 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Tools for the Shift.<br/>Yours, Free.
                    </MainTitle>
                </motion.div>
                <Text className='mb-6 md:mb-12'>
                    Our gift to you: digital downloads designed to support your journey into more clarity, harmony, and alignment.
                </Text>
                <div className='email-form'>
                    {/* <form className='flex flex-col gap-8 sm:px-10 md:px-30' onSubmit={handleAccessSubmit}>
                        <div>
                            <label htmlFor='email' className='sr-only'>Email Address</label>
                            <input 
                                type='email' 
                                id='email' 
                                name='email' 
                                placeholder='Email' 
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.6 }}
                        >
                            <FullWidthButton>
                                Access The Library
                            </FullWidthButton>
                        </motion.div>
                    </form> */}
                    <ConvertKitForm formId="8250927" />
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'>
                
            </div>
            <div className='container py-8 md:py-18 text-center'>
                <div className='mb-12 md:mb-24'>
                    <SubTitle className='mb-12 md:mb-24'>
                        Active Portals
                    </SubTitle>
                    <div className='zen-card-grid grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center'>
                        {activeZenshiftCategoryLists.map((item: ZenshiftCategoryProps, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.6 }}
                                className='rounded-xl overflow-hidden shadow-lg flex flex-col w-full max-w-[420px] hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] cursor-pointer'
                                onClick={handleClick(item.link)}
                            >
                                <ExplosionEffect className='h-full flex flex-col' dotQuantity={60} explosionRadius={500} speed={0.8}>
                                    <div className='relative flex flex-col items-start min-h-[180px]'>
                                        <img src={item.image} alt='ZenShift Interior' className='w-full h-full' />
                                    </div>
                                    <div className='bg-[#2d2320] p-6 flex flex-col flex-grow items-center'>
                                        <div className='flex-grow'>
                                            <div className='font-playfair text-white zen-card-title py-4 tracking-widest'>{item.title}</div>
                                            <div className='font-lato text-[#d6d1c4] text-[20px] mb-4 text-center leading-5'>
                                                {item.text}
                                            </div>
                                        </div>
                                        <button
                                            className='learn-more-button rounded-lg border-2 border-white text-white px-6 py-2 flex items-center gap-2 font-lato font-semibold'
                                        >
                                            ENTER <span className='text-lg'>→</span>
                                        </button>
                                    </div>
                                </ExplosionEffect>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div>
                    <SubTitle className='mb-12 md:mb-24'>
                        Coming Fall {new Date().getFullYear()}
                    </SubTitle>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center'>
                        {comingZenshiftCategoryLists.map((item: ZenshiftCategoryProps, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 0.7, y: 0 }}
                                whileHover={{ scale: 1.00 }}
                                transition={{ duration: 0.6 }}
                                className='rounded-xl overflow-hidden shadow-lg flex flex-col w-full max-w-[420px] hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] bg-[#fff]'
                                // onClick={() => setOpen(true)}
                            >
                                <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8}>
                                    <div className='rounded-xl overflow-hidden bg-[#f9eedd] flex flex-col w-full shadow-lg'>
                                        <div className='relative'>
                                            <img src={item.image} alt={item.title} className='w-full h-full' />
                                        </div>
                                        <div className='bg-[#2d2320] p-6 flex flex-col items-center'>
                                            <div className='zen-coming-card-title font-playfair text-white text-2xl font-bold text-center tracking-widest max-w-[300px]'>
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                </ExplosionEffect>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-12 md:mb-24'>
                    What Is Inside<br/>The Library
                </SubTitle>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 justify-items-center'>
                    {insideLists.map((item: InsideItemProps, index: number) => (
                        <InsideCard key={index} title={item.title} buttonText='Preview' subtitle={item.subtitle || ''} />
                    ))}
                </div>
            </div> */}
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-12 md:py-24 text-center'
            >
                <SubTitle className='mb-612 md:mb-24'>
                    Why We Do This
                </SubTitle>
                <Text>
                    <span>ZenShift</span> is more than a brand—it's a movement. And every <b>transformation</b> begins with <b>aligned access</b>. We believe your shift shouldn't be behind a paywall.
                </Text>
            </motion.div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            {/* <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-12 md:py-24 text-center'
            >
                <SubTitle className='mb-12 md:mb-24'>
                    Already A Subscriber?
                </SubTitle>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                >
                    <FullWidthButton onClick={handleClick('/freebie-library')}>
                        Login to the Library or Request Unlock Link
                    </FullWidthButton>
                </motion.div>
                <Text className='mt-12'>
                    <i>Not sure which tool is right for you? Ask <a href='/zen-ai'>ZenAI.</a></i>
                </Text>
            </motion.div> */}
        </>
    );
}

export default FreebieLib;