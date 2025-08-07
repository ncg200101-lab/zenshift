import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExplosionEffect from './ExplosionEffect';
import { ShiftTypes } from '../../state/product/types';

export interface JournalItemProps {
    id: string;
    vertical: ShiftTypes;
    src: string;
    title: string;
    summary: string;
}

const JournalItem = ({ id, vertical, src, title, summary }: JournalItemProps) => {
    const verticalColors: Record<ShiftTypes, { bg: string; text: string }> = {
        Interior: { bg: 'bg-[#FFF3E0]', text: 'text-[#FF8A65]' },
        Health: { bg: 'bg-[#E8F5E9]', text: 'text-[#66BB6A]' },
        Abundance: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Apothecary: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Kids: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Masters: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Travels: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Academy: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Collectives: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        Golf: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        ZenShift: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
        ZenAI: { bg: 'bg-[#E1F5FE]', text: 'text-[#2196F3]' },
    };

    const colors = verticalColors[vertical];
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/journal/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate, id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex justify-center'
        >
            <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8} className='h-full'>
                <div className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-md h-full'>
                    <div className='w-full flex items-center overflow-hidden' style={{ aspectRatio: 1 / 1 }}>
                        <img src={src} alt={title} className='w-full h-full object-cover rounded-t-lg' />
                    </div>
                    <div className='flex flex-col space-y-4 flex-grow p-10 text-start'>
                        <div className='flex-grow'>
                            <h2 className='text-2xl font-bold mb-2'>{title}</h2>
                            <p className='text-gray-700 text-xl'>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>{vertical}</span>
                                - {summary}
                            </p>
                        </div>
                        <div>
                            <button className='text-black text-xl hover:underline' onClick={handleClick}>Read More</button>
                        </div>
                    </div>
                </div>
            </ExplosionEffect>
        </motion.div>
    );
};

export default JournalItem; 