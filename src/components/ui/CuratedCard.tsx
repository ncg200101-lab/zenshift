import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FindSectionCardProps {
    imageSrc: string;
    title: string;
    category: string;
    tooltip?: string;
}

const CuratedCard = ({ imageSrc, title, category, tooltip }: FindSectionCardProps) => {
    const navigate = useNavigate();

    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        navigate(`/store/${category}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate, category]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className='flex justify-center items-center text-center rounded-lg cursor-pointer hover:z-[50]'
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
        >
            <div className='relative w-60 min-w-60 h-60 transition-transform duration-300 hover:scale-105 rounded-xl'>
                <img
                    src={imageSrc}
                    alt={title}
                    className='rounded-xl w-full h-full'
                />
                {tooltip && showTooltip && (
                    <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-[10] w-[200px]'>
                        {tooltip}
                        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900'></div>
                    </div>
                )}
            </div>
            
        </motion.div>
    );
};

export default CuratedCard; 