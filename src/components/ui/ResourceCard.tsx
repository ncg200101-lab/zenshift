import { motion } from 'framer-motion';

interface ResourceCardProps {
    imageSrc: string;
    title: string;
    link?: string;
    className?: string;
    
}

const ResourceCard = ({
    imageSrc, title, link, className
}: ResourceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className={`relative bg-[#FAE8C5] p-6 rounded-xl overflow-hidden shadow-lg w-full max-w-xs mx-auto hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] ${className || ''}`}
        >
            <div className='flex justify-center mb-8'>
                <div className='w-[160px] h-[160px] min-w-[160px] lg:w-[200px] lg:h-[200px] lg:min-w-[200px]'>
                    <img src={imageSrc} alt={title} className='w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[1.02]' />
                </div>
            </div>
            <h3 className='text-center text-2xl lg:text-3xl text-[#362925] font-bold mb-4'>{title}</h3>
        </motion.div>
    );
};

export default ResourceCard; 