import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LegalDocCard from '../components/ui/LegalDocCard';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { LargeFilledButton } from '../components/ui/Buttons';

const PrivacyPolicy = () => {
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
                        Privacy Policy
                    </MainTitle>
                </motion.div>
                <Text>
                    At ZenShift, your privacy is honored as sacred. This policy explains how we collect, use, and protect your information—so you can journey with clarity and trust.
                </Text>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>
                    What We Collect
                </SubTitle>
                <div className='space-y-4'>
                    <LegalDocCard
                        title='📝 Personal Information:'
                        points={[
                            "a. When you sign up, purchase, or interact, we may collect your name, email, and contact details.",
                            "b. If you use ZenAI or our tools, we may learn from your input to refine the ZenAI experience for all.",
                            "c. Payment details are processed securely by trusted third-party providers—we never store your full payment info."
                        ]}
                    />
                    <LegalDocCard
                        title='🌐 Usage & Device Data:'
                        points={[
                            "a. We gather data on how you use ZenShift (pages visited, features used) to enhance your journey.",
                            "b. Device and browser info (like IP address, type, and settings) may be collected for security and analytics."
                        ]}
                    />
                    <LegalDocCard
                        title='🍪 Cookies & Tracking:'
                        points={[
                            "a. We use cookies and similar technologies to remember your preferences and personalize your experience.",
                            "b. You can manage cookies in your browser settings—your sovereignty is respected."
                        ]}
                    />
                    <LegalDocCard
                        title='🤝 Third-Party Sharing:'
                        points={[
                            "a. We only share your data with trusted partners (like payment processors or email services) to fulfill your requests.",
                            "b. Affiliate links may take you to third-party sites—their privacy practices apply there.",
                            "c. We never sell your data."
                        ]}
                    />
                    <LegalDocCard
                        title='🔒 Data Security:'
                        points={[
                            "a. We use industry-standard security to protect your information.",
                            "b. While we strive for energetic and digital safety, no system is 100% immune—please use discernment online."
                        ]}
                    />
                    <LegalDocCard
                        title='🧘 Your Rights & Choices:'
                        points={[
                            "a. You can access, update, or request deletion of your personal data—just email us.",
                            "b. You may unsubscribe from emails at any time.",
                            "c. You have the right to ask how your data is used or shared."
                        ]}
                    />
                    <LegalDocCard
                        title='🌍 International Users:'
                        points={[
                            "a. ZenShift is accessible worldwide. By using our site, you consent to data transfer and processing in accordance with this policy.",
                            "b. We honor GDPR, CCPA, and other privacy frameworks where applicable."
                        ]}
                    />
                    <LegalDocCard
                        title='📅 Policy Updates:'
                        points={[
                            "a. This policy may evolve as we grow. Major changes will be communicated clearly.",
                            "b. Please revisit this page for the latest version."
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
                    Questions or Requests?
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
                    If you have questions about your privacy, data, or this policy, we welcome conscious conversation. Your trust is our highest priority.
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

export default PrivacyPolicy;
