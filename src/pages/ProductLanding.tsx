import { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FilledColorButton, FullWidthButton, TransparentColorButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';

const ProductLanding = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        try {
            setIsLoading(true);
            console.log('Submitting data:', email);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, email]);

    return (
        <>
            <div className='absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-[60px] md:top-[80px] left-0 -z-[1] -translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/blue-chakra.png' alt='' />
            </div>
            <div className='container pt-12 md:pt-24 pb-12'>
                <div className='flex flex-col md:flex-row md:items-center space-x-4 rounded-lg mb-6'>
                    <div className='w-full md:w-3/5 text-left'>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className='mb-8 md:mb-16'
                        >
                            <MainTitle>
                                Start Your 5D Home Shift Today
                            </MainTitle>
                        </motion.div>
                        <Text>
                            Download your free guide to aligning your space, energy, and life. Includes a chakra room map and checklist.
                        </Text>
                    </div>
                    <div className='flex hidden md:flex md:w-2/5 aspect-square justify-center md:justify-center items-center animate-float'>
                        <div className='big-chakra-circle indigo'></div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-6 justify-around'>
                    <FilledColorButton className='w-full md:w-fit' color='#FF752B'>
                        ✨ Receive the Free Guide
                    </FilledColorButton>
                    <TransparentColorButton className='w-full md:w-fit' color='#FF752B'>
                        Activate Full Access
                    </TransparentColorButton>
                </div>
            </div>
            <div className='bg-white w-full h-[3px]'></div>
            <div className='container py-6 md:py-12 text-center'>
                <SubTitle className='mb-6 md:mb-12'>
                    What You will Receive
                </SubTitle>
                <div className='rounded-lg mb-6 p-6 md:p-12 bg-gradient-to-r from-[#B987F0] to-[#E0A8F7]'>
                    <ul className='list-none text-white'>
                        <li className='flex items-center mb-4 text-xl md:text-4xl'>
                            <span className='w-5 h-5 rounded-full border-2 border-white flex-shrink-0 mr-4 flex items-center justify-center'>
                                <span className='w-4 h-4 rounded-full bg-[#763AF5]'></span>
                            </span>
                            <span className='font-bold'>Digital eBook (PDF)</span>
                        </li>
                        <li className='flex items-center mb-4 text-xl md:text-4xl'>
                            <span className='w-5 h-5 rounded-full border-2 border-white flex-shrink-0 mr-4 flex items-center justify-center'>
                                <span className='w-4 h-4 rounded-full bg-[#763AF5]'></span>
                            </span>
                            <span className='font-bold'>Energy Tools: Chakra room grid</span>
                        </li>
                        <li className='flex items-center text-xl md:text-4xl'>
                            <span className='w-5 h-5 rounded-full border-2 border-white flex-shrink-0 mr-4 flex items-center justify-center'>
                                <span className='w-4 h-4 rounded-full bg-[#763AF5]'></span>
                            </span>
                            <span className='font-bold'>Bonus: Quick-Start checkList</span>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-end'>
                    <img src='/assets/icons/paypal.png' alt='' className='w-[50px] md:w-[100px]' />
                </div>
                <div className='email-form'>
                    <form className='flex flex-col md:flex-row gap-6 py-10' onSubmit={handleSubmit}>
                        <div className='w-full'>
                            <label htmlFor='email' className='sr-only'>Email Address</label>
                            <input 
                                type='email' 
                                id='email' 
                                name='email' 
                                placeholder='Email Address' 
                                required
                                value={email}
                                onChange={handleEmailChange}
                                className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <FullWidthButton type='submit'>
                            Send My Tools
                        </FullWidthButton>
                    </form>
                </div>
                <Text className='text-left'>
                    No Spam. Just resonance
                </Text>
                <div className='mt-12'>
                    <h3 className='text text-2xl md:text-4xl mb-4 md:mb-6'>
                        Invite to Explore
                    </h3>
                    <a href='/' className='text-4xl md:text-6xl font-bold text-center underline font-playfair text-[#362925]'>
                        ZenShift.Com
                    </a>
                </div>
            </div>
        </>
    );
}

export default ProductLanding;