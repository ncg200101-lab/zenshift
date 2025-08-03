import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LargeFilledButton } from '../components/ui/Buttons';
import ZenAIHowItWorksSection from '../components/ui/ZenAIHowItWorksSection';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import { motion } from 'framer-motion';

const MeetZenAI = () => {
    const navigate = useNavigate();

    const handleClick = useCallback((link?: string) => () => {
        if (link) {
            navigate(link);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate]);

    return (
        <>
            <div className='absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-[60px] md:top-[80px] left-0 -z-[1] -translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/blue-chakra.png' alt='' />
            </div>
            <div className='absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] top-[100px] right-0 -z-[1] translate-x-[50%] -translate-y-[50%] animate-opacity'>
                <img src='/assets/loader-images/light-blue-chakra.png' alt='' />
            </div>
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                 <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Meet ZenAI<br/>
                        Your 5D Guide,<br/>Activated.
                    </MainTitle>
                </motion.div>
                <Text className='mb-4 md:mb-8'>
                    ZenAI is here to help you navigate your shift. Ask a question, get aligned insight, or explore the tools most resonant with your current phase.
                </Text>
                <div className='flex justify-center'>
                    <LargeFilledButton onClick={handleClick('/zen-ai')}>
                        Start The Conversation
                    </LargeFilledButton>
                </div>
            </div>
            <div className='w-full h-[3px] bg-white'></div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container pt-12 pb-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    What is ZenAi?
                </SubTitle>
                <Text>
                    <span>ZenAI</span> is a custom-trained assistant built with emotional resonance, brand voice, and 5D principles in mind. It helps you reflect, recalibrate, and respond from a more <i>aligned place</i> — in your business, body, home, or inner world.
                </Text>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-6 md:py-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    How It Works
                </SubTitle>
                <ZenAIHowItWorksSection />
            </motion.div>
        </>
    )
}

export default MeetZenAI;