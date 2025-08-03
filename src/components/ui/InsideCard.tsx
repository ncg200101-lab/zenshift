import { motion } from 'framer-motion';
import ExplosionEffect from '../../components/ui/ExplosionEffect';

interface InsideCardProps {
    title: string;
    buttonText: string;
    subtitle?: string;
};

const InsideCard = ({ title, buttonText, subtitle }: InsideCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6 }}
            className='bg-white rounded-4xl shadow-lg rounded-xl overflow-hidden w-full max-w-sm mx-auto hover:shadow-[0_0_20px_rgba(255,230,77,0.4)]'
        >
            <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8} className='w-full h-full'>
                <div className='flex flex-col h-full'>
                    <div className='bg-gradient-to-br from-violet-500 to-blue-400 min-h-60 flex items-center justify-center p-4 relative'>
                        <div className='chakra-col absolute'>
                            <div className='chakra-small-circle purple'></div>
                            <div className='chakra-small-circle indigo'></div>
                            <div className='chakra-small-circle blue'></div>
                            <div className='chakra-small-circle green'></div>
                            <div className='chakra-small-circle yellow'></div>
                        </div>
                    </div>

                    <div className='p-8 text-center flex flex-col flex-grow justify-between min-h-[200px]'>
                        <div>
                            <h3 className='font-playfair text-[#362925] text-3xl font-medium'>
                                {title}
                            </h3>
                            {subtitle && <p className='font-lato text-[#454545] text-sm mt-2'>{subtitle}</p>}
                        </div>

                        <button className='bg-gradient-to-br from-[#763AF5] to-[#A259FF] cursor-pointer text-white text-2xl px-8 py-3 mt-4 rounded-3xl font-medium shadow-[0_6px_0_#5a2bbd,0_2px_20px_rgba(162,89,255,0.25)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_2px_0_#5a2bbd,0_6px_24px_rgba(162,89,255,0.35)] active:translate-y-1 active:shadow-[0_2px_0_#5a2bbd,0_1px_8px_rgba(162,89,255,0.18)]'>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </ExplosionEffect>
        </motion.div>
    );
}

export default InsideCard;