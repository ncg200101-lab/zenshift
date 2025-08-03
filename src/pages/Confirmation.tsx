import { motion } from 'framer-motion';
import DashboardHeader from '../components/layouts/DashboardHeader';
import Footer from '../components/layouts/Footer';
import { Text } from '../components/ui/Text';
import ExplosionEffect from '../components/ui/ExplosionEffect';

const PostPurchaseConfirmation = () => {
    return (
        <>
            <DashboardHeader />
            <div className='bg-white'>
                <div className='container pt-12 md:pt-24 pb-12'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='w-full max-w-6xl p-8 md:p-16 bg-[#FDF8F8] mx-auto rounded-xl shadow-[4px_4px_70px_52px_rgba(154,30,226,0.46)]'
                    >
                        <div className='mb-12 md:mb-24'>
                            <h1 className='text-2xl md:text-3xl font-playfair font-bold text-center uppercase mb-6'>
                                Thank you for your subscription
                            </h1>
                            <Text className='#808080 text-center'>
                                Your ZenAI membership has been activated successfully.
                            </Text>
                        </div>
                        <div className='mb-12'>
                            <Text className='#808080 text-center mb-6'>
                                You now have full access to ZenAI and all its features.
                            </Text>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.6 }}
                                className='max-w-xl mx-auto'
                            >
                                <ExplosionEffect className='w-full'>
                                    <button className='relative w-full quad-gradient text-white text-xl md:text-2xl py-4 rounded-xl font-semibold cursor-pointer'>
                                        <span className='absolute top-1/2 left-[20px] transform translate-y-[-50%]'>
                                            <svg width='30' height='25' viewBox='0 0 68 51' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M44.1808 30.1621L29.2305 33.5134L44.1808 36.8649L47.9185 50.2702L52.2789 36.8649L67.2293 33.5134L52.2789 30.1621L47.2954 15.0811L44.1808 30.1621Z' fill='white' />
                                                <path d='M8.05019 8.61783L0 10.5329L8.05019 12.4479L10.0626 20.1081L12.4106 12.4479L20.4608 10.5329L12.4106 8.61783L9.72733 0L8.05019 8.61783Z' fill='white' />
                                            </svg>
                                        </span>
                                        Launch ZenAI
                                    </button>
                                </ExplosionEffect>
                            </motion.div>
                        </div>
                        <div className='h-[2px] w-full max-w-2xl mx-auto bg-[#808080]'></div>
                        <div className='mt-12'>
                            <Text className='#808080 text-center mb-6'>
                                Redirecting to ZenAi in 5 Seconds
                            </Text>
                            <div className='flex flex-col md:flex-row gap-2 justify-around items-center'>
                                <ExplosionEffect>
                                    <button className='w-[280px] flex items-center justify-between py-3 px-6 border border-[#BCBCBC] rounded-md text-gray-700 font-semibold hover:bg-gray-50 transition duration-300'>
                                        <svg className='w-6 md:w-8 h-6 md:h-8' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <g clipPath='url(#clip0_258_1956)'>
                                                <path d='M33 21C33 25.98 28.98 30 24 30C19.02 30 15 25.98 15 21C15 16.02 19.02 12 24 12C28.98 12 33 16.02 33 21Z' fill='#1E1E1E' />
                                                <path fillRule='evenodd' clipRule='evenodd' d='M48 24C48 37.26 37.26 48 24 48C10.74 48 0 37.26 0 24C0 10.74 10.74 0 24 0C37.26 0 48 10.74 48 24ZM12 41.25C12.48 40.452 17.13 33 23.97 33C30.78 33 35.46 40.47 35.94 41.25C38.7296 39.321 41.0089 36.7432 42.5819 33.7384C44.1548 30.7335 44.9744 27.3916 44.97 24C44.97 12.39 35.58 3 23.97 3C12.36 3 2.97 12.39 2.97 24C2.97 31.14 6.54 37.47 12 41.25Z' fill='#1E1E1E' />
                                            </g>
                                        </svg>
                                        <span className='text-xl lg:text-2xl'>Go To DashBoard</span>
                                    </button>
                                </ExplosionEffect>
                                <ExplosionEffect>
                                    <button className='w-[280px] flex items-center justify-between py-3 px-6 border border-[#BCBCBC] rounded-md text-gray-700 font-semibold hover:bg-gray-50 transition duration-300'>
                                        <svg className='w-6 md:w-8 h-6 md:h-8' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <path fillRule='evenodd' clipRule='evenodd' d='M16.5861 0.586061C16.9611 0.211119 17.4698 0.000488281 18.0001 0.000488281C18.5304 0.000488281 19.039 0.211119 19.4141 0.586061L31.4141 12.5861L35.4141 16.5861C35.7784 16.9633 35.98 17.4685 35.9754 17.9929C35.9709 18.5173 35.7605 19.0189 35.3897 19.3897C35.0189 19.7605 34.5173 19.9709 33.9929 19.9754C33.4685 19.98 32.9633 19.7784 32.5861 19.4141L32.0001 18.8281V32.0001C32.0001 33.0609 31.5787 34.0783 30.8285 34.8285C30.0784 35.5786 29.0609 36.0001 28.0001 36.0001H22.0001C21.4696 36.0001 20.9609 35.7893 20.5859 35.4143C20.2108 35.0392 20.0001 34.5305 20.0001 34.0001V28.0001H16.0001V34.0001C16.0001 34.5305 15.7894 35.0392 15.4143 35.4143C15.0392 35.7893 14.5305 36.0001 14.0001 36.0001H8.00008C6.93922 36.0001 5.9218 35.5786 5.17165 34.8285C4.42151 34.0783 4.00008 33.0609 4.00008 32.0001V18.8281L3.41408 19.4141C3.03688 19.7784 2.53167 19.98 2.00728 19.9754C1.48289 19.9709 0.981261 19.7605 0.610445 19.3897C0.239629 19.0189 0.0292906 18.5173 0.0247338 17.9929C0.020177 17.4685 0.221766 16.9633 0.586082 16.5861L4.58608 12.5861L16.5861 0.586061Z' fill='#1E1E1E' />
                                        </svg>
                                        <span className='text-xl lg:text-2xl'>Return to Home</span>
                                    </button>
                                </ExplosionEffect>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PostPurchaseConfirmation;