import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import InsideCard from '../components/ui/InsideCard';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';

interface InsideItemProps {
    title: string;
    subtitle?: string;
};

const insideLists: InsideItemProps[] = [
    {
        title: '5D Home Starter Pack',
    },
    {
        title: 'Emotional Mastery Map',
    },
    {
        title: 'Chakra Design Moodboard',
    },
    {
        title: 'ZenShift Vision Guide',
        subtitle: 'You\'ve Been Here Before'
    },
]

const FreebieLib = () => {
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
                    <form className='flex flex-col gap-8 sm:px-10 md:px-30' onSubmit={handleAccessSubmit}>
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
                    </form>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-12 md:mb-24'>
                    What Is Inside<br/>The Library
                </SubTitle>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 justify-items-center'>
                    {insideLists.map((item: InsideItemProps, index: number) => (
                        <InsideCard key={index} title={item.title} buttonText='Preview' subtitle={item.subtitle || ''} />
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
                <SubTitle className='mb-612 md:mb-24'>
                    Why We Do This
                </SubTitle>
                <Text>
                    <span>ZenShift</span> is more than a brand—it's a movement. And every <b>transformation</b> begins with <b>aligned access</b>. We believe your shift shouldn't be behind a paywall.
                </Text>
            </motion.div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <motion.div 
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
                    <FullWidthButton>
                        Login to the LIbrary or Request Unlock Link
                    </FullWidthButton>
                </motion.div>
                <Text className='mt-12'>
                    <i>Not sure which tool is right for you? Ask <a href='/zen-ai'>ZenAI.</a></i>
                </Text>
            </motion.div>
        </>
    );
}

export default FreebieLib;