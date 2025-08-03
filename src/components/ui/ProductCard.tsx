import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ExplosionEffect from '../../components/ui/ExplosionEffect';

interface ProductCardProps {
    id?: string;
    src: string;
    title: string;
    isNew?: boolean;
    rating?: number;
    isPick?: boolean;
    className?: string;
    isAffiliate?: boolean;
    buttonText?: string;
}

const ProductCard = ({
    id, src, title, isNew, rating, isPick, className, isAffiliate, buttonText
}: ProductCardProps) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        if (id) {
            navigate(`/product/${id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate, id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className={`relative bg-[#18051B] rounded-xl overflow-hidden shadow-lg w-full max-w-xs mx-auto hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] ${className || ''}`}
        >
            <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8}>
                <div className='relative p-4'>
                    <img src={src} alt={title} className='w-full h-full object-cover rounded-lg' />
                    {isPick ? (
                        <span className='absolute top-[15px] right-[15px] bg-black text-[#FFE600] text-xs font-bold px-2 py-1 rounded-full rounded-r-none rounded-t-none flex items-center'>
                            ⭐ Zenshift Pick
                        </span>
                    ) : isNew ? (
                        <span className='absolute top-[15px] right-[15px] bg-black text-[#FFE600] text-xs font-bold px-2 py-1 rounded-full rounded-r-none rounded-t-none'>New</span>
                    ) : rating ? (
                        <span className='absolute top-[15px] right-[15px] bg-black text-[#FFE600] text-xs font-bold px-2 py-1 rounded-full rounded-r-none rounded-t-none flex items-center'>
                            ⭐ {rating}
                        </span>
                    ) : null}
                    {isAffiliate && (
                        <span className='absolute top-[15px] left-[15px] bg-[#FFE653] text-black text-xs font-bold px-2 py-1 rounded-full'>
                            Affiliate
                        </span>
                    )}
                </div>
                <div className='p-4 text-center'>
                    <h3 className='text-white text-start! text-lg font-bold mb-4'>{title}</h3>
                    {buttonText && <button 
                        onClick={handleClick}
                        className='w-full bg-[#A823F9] text-white py-2 px-4 rounded-full font-bold transition-all duration-300 hover:bg-opacity-90 hover:shadow-[0_0_10px_rgba(255,230,77,0.5)]'
                    >
                        {buttonText}
                    </button>}
                </div>
            </ExplosionEffect>
        </motion.div>
    );
};

export default ProductCard; 