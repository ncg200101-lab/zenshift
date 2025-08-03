import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LegalDocCard from '../components/ui/LegalDocCard';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { LargeFilledButton } from '../components/ui/Buttons';

const TermsAndCondition = () => {
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
            <div className='container pt-18 md:pt-36 pb-12 md:pb-24 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Terms & Conditions
                    </MainTitle>
                </motion.div>
                <Text>
                    By choosing to engage with ZenShift, you enter into a conscious agreement—one built on clarity, trust, and respect. These terms are here not to restrict your journey, but to help hold the container as you shift into new space.
                </Text>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-12'>
                    Acceptance of terms
                </SubTitle>
                <Text className='mb-12'>
                    By accessing or using ZenShift, you agree to these terms.
                </Text>
                <div className='space-y-4'>
                    <LegalDocCard
                        title='📦 Purchases and Digital Products:'
                        points={[
                            'a. All digital products are final sale unless otherwise noted.',
                            'b. Affiliate-linked items are offered through trusted third parties. Fulfillment and delivery is their responsibility.',
                            'c. We only recommend what aligns, but we do not guarantee third-party outcomes.'
                        ]}
                    />
                    <LegalDocCard
                        title='🧠 Use of ZenAI:'
                        points={[
                            'a. ZenAI is a sacred companion trained on ZenShift insights to provide energetic, emotional, and intuitive guidance.',
                            'b. It is not a medical, legal, or financial advisor.',
                            'c. Use your discernment. You are the sovereign authority in your life.'
                        ]}
                    />
                    <LegalDocCard
                        title='📧 Email Communication:'
                        points={[
                            'a. By opting in, you agree to receive aligned updates, tools, and offers.',
                            'b. You can unsubscribe at any time—energetic boundaries are honored here.'
                        ]}
                    />
                    <LegalDocCard
                        title='🛡️ Intellectual Property:'
                        points={[
                            'a. All content, language, visuals, and digital materials are the property of ZenShift unless otherwise credited.',
                            'b. Please don\'t copy, reproduce, or republish anything without written permission.',
                            'c. We trust you to honor creation as sacred.'
                        ]}
                    />
                    <LegalDocCard
                        title='⚖️ Disclaimers & Liability:'
                        points={[
                            'a. ZenShift content is offered \'as-is\' for educational and energetic support.',
                            'b. We are not liable for individual interpretations or third-party outcomes.',
                            'c. Your discernment is your power.'
                        ]}
                    />
                    <LegalDocCard
                        title='📅 Modifications:'
                        points={[
                            'a. These terms may be updated occasionally to stay aligned with our evolving mission.',
                            'b. You\'re encouraged to revisit them periodically.',
                            'c. We\'ll always notify you of major shifts—because clarity matters.'
                        ]}
                    />
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container py-12 md:py-24 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Questions or Concerns?
                </SubTitle>
                <div className='flex justify-center items-center text-2xl md:text-5xl font-bold font-playfair text-[#362925] mb-6'>
                    <span className="flex items-center text-2xl md:text-5xl mt-1">
                        <MailOutlineOutlinedIcon sx={{ color: '#34dae3' }} fontSize="inherit" />
                    </span>
                    <a href='mailto:hello@zenshift.com' className='underline ml-2 text-2xl md:text-5xl font-bold font-playfair bg-gradient-to-r from-[#34dae3] to-[#2094a1] bg-clip-text text-transparent text-[#362925]'>
                        hello@zenshift.com
                    </a>
                </div>
                <Text>
                    If you have questions about our terms, practices, or agreements, we're always open to conscious conversation.
                </Text>
                <div className='flex justify-center mt-8 md:mt-16'>
                    <LargeFilledButton onClick={handleClick('/')}>
                        Return to ZenShift
                    </LargeFilledButton>
                </div>
            </motion.div>
        </>
    )
}

export default TermsAndCondition;