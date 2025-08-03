import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';

export interface BlogPostProps {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    readTime: string;
    date: string;
    className?: string;
}

const BlogPost = ({ title, description, imageSrc, readTime, date, className }: BlogPostProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`
                flex flex-col md:flex-row p-4 rounded-lg justify-center
                transition-all duration-500 ease-in-out cursor-pointer
                relative overflow-hidden hover:shadow-lg group
                ${className || ''}
            `}
        >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] 
                            transition-transform duration-1000 ease-in-out' />
                
                <div className='flex-shrink-0 w-full md:w-48 h-auto md:mr-6 mb-4 md:mb-0'>
                    <img
                        src={imageSrc}
                        alt={title}
                        className='rounded-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                    />
                </div>
                <div className='text-start w-full md:w-[500px]'>
                    <h2 className='text-xl md:text-2xl font-bold text-[#121212] mb-2 transition-colors duration-300 group-hover:text-[#3522F9]'>
                        {title}
                    </h2>
                    <p className='text-black text-base mb-3'>
                        {description}
                    </p>
                    <button className='text-[#3522F9] hover:underline text-base md:text-lg font-medium'>
                        Read More
                    </button>
                    <p className='text-[#717171] text-sm mt-1'>
                        {readTime} • {formatDate(date)}
                    </p>
                </div>
        </motion.div>
    );
};

export default BlogPost;