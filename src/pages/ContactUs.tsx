import { motion } from 'framer-motion';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import SocialIcons from '../components/ui/SocialIcons';

interface FormDataTypes {
    fullName: string,
    email: string,
    message: string,
}

const ContactUs = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataTypes>({
        fullName: '',
        email: '',
        message: '',
    });

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        try {
            setIsLoading(true);
            console.log('Submitting Data: ', formData);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [formData, isLoading]);

    return (
        <>
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle className='w-full max-w-[700px] mx-auto'>
                        Reach Out. <br />
                        You're Not Alone in the <span>Shift</span>
                    </MainTitle>
                </motion.div>
                <Text>
                    Whether you have a question, a collaboration idea, or just want to say hi - we'd love to hear from you.<br/>
                    —<br/>
                    <br/>
                    This is a space of resonance. Your words are welcome here.
                </Text>
            </div>
            <div className='w-full h-[3px] bg-white'></div>

            <div className='container py-6 md:py-12'>
                <form className='space-y-6 sm:px-10 md:px-30' onSubmit={handleSubmit}>
                    <div className='relative'>
                        <label htmlFor='fullName' className='sr-only'>Full Name</label>
                        <input
                            type='text' 
                            id='fullName' 
                            name='fullName'
                            autoComplete='fullName'
                            placeholder='Full Name'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                        />
                    </div>
                    <div className='relative'>
                        <label htmlFor='email' className='sr-only'>Email Address</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email'
                            autoComplete='email'
                            placeholder='Email Address'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                        />
                    </div>
                    <div className='relative'>
                        <label htmlFor='message' className='sr-only'>A ripple you want to share...</label>
                        <textarea 
                            id='message' 
                            name='message'
                            placeholder='A ripple you want to share...' 
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6} 
                            className='w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                        ></textarea>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FullWidthButton type='submit'>
                            Send Aligned Message
                        </FullWidthButton>
                    </motion.div>
                </form>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container text-center pb-12'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Collaborate or Partner
                </SubTitle>
                <Text>
                    Have a project, platform, or product that aligns with the ZenShift vision? We're open to co-creating with aligned souls, systems, and brands.<br/>
                    <i>Let's co-create what's next.</i>
                </Text>
                <h1 className='font-playfair mb-5 text-[#362925] mt-6 md:mt-12 text-2xl md:text-4xl font-bold'>
                    Find Us Around the World
                </h1>
                <SocialIcons />
            </motion.div>
        </>
    )
}

export default ContactUs;