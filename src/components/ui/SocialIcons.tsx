import { motion } from 'framer-motion';

const SocialIcons = () => {
    return (
        <div className='flex justify-center gap-x-6'>
            <motion.a 
                href='https://www.facebook.com/profile.php?id=61576869086046' 
                target='_blank'
                aria-label='Facebook' 
                className='w-12 h-12 md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg relative group'
                whileHover={{ scale: 1.02 }}
            >
                <img src='/assets/icons/facebook.svg' alt='Facebook' className='w-[250px] h-[250px]' />
                <span className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    Follow us on Facebook
                </span>
            </motion.a>
            <motion.a 
                href='https://www.instagram.com/zenshiftofficial/'
                target='_blank'
                aria-label='Instagram' 
                className='w-12 h-12 md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg relative group'
                whileHover={{ scale: 1.02 }}
            >
                <img src='/assets/icons/instagram.svg' alt='Instagram' className='w-[250px] h-[250px]' />
                <span className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    Follow us on Instagram
                </span>
            </motion.a>
            <motion.a 
                href='https://www.pinterest.com/zenshiftofficial/'
                target='_blank'
                aria-label='Pinterest' 
                className='w-12 h-12 md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg relative group'
                whileHover={{ scale: 1.02 }}
            >
                <img src='/assets/icons/pinterest.svg' alt='Pinterest' className='w-[250px] h-[250px]' />
                <span className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    Follow us on Pinterest
                </span>
            </motion.a>
            <motion.a 
                href='mailto:hello@zenshift.com' 
                aria-label='Email' 
                className='w-12 h-12 md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg relative group'
                whileHover={{ scale: 1.02 }}
            >
                <img src='/assets/icons/gmail.svg' alt='Email' className='w-[250px] h-[250px]' />
                <span className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    Contact us via Email
                </span>
            </motion.a>
        </div>
    );
}

export default SocialIcons;