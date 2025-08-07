import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { FullWidthButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import { ProductTypes } from '../state/product/types';
import { getAllProductsAction } from '../state/product/actions';
import SpinLoader from '../components/ui/SpinLoader';
import { useLocation } from 'react-router-dom';
import { ShiftTypes } from '../state/product/types';

const FreebieLibrary = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [freebies, setFreebies] = useState<ProductTypes[]>([]);
    const location = useLocation();
    const portal = location.state?.portal as string;

    const handleDownload = async (url: string, filename: string) => {
        try {
          const response = await fetch(url, { credentials: 'include' }); // include cookies if needed
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
      
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
          console.error('Download failed', err);
        }
      };
      
    useEffect(() => {
        const fetchFreebies = async () => {
            setIsLoading(true);
            try {
                const result = await dispatch(getAllProductsAction({ shift: portal as ShiftTypes,  limit: '50', includePrintify: 'false' })).unwrap();
                const freebieProducts = result.products?.filter((product: ProductTypes) => product.isFreebie) || [];
                setFreebies(freebieProducts);
            } catch(e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFreebies();
    }, [dispatch]);

    if (isLoading) {
        return (
            <SpinLoader className='flex-grow' size={50} />
        );
    }

    return (
        <>
            <div className='absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-[60px] md:top-[80px] left-0 -z-[1] -translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/blue-chakra.png' alt='' />
            </div>
            <div className='absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] top-[100px] right-0 -z-[1] translate-x-[50%] -translate-y-[50%] animate-opacity'>
                <img src='/assets/loader-images/light-blue-chakra.png' alt='' />
            </div>
            
            <div className='container py-12 md:py-24 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Freebie Library
                    </MainTitle>
                </motion.div>
                <Text className='mb-6 md:mb-12'>
                    Access your free digital downloads designed to support your journey into more clarity, harmony, and alignment.
                </Text>
                {freebies.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {freebies.map((freebie: ProductTypes, index: number) => (
                            <motion.div
                                key={freebie._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
                            >
                                <div className='aspect-square overflow-hidden'>
                                    <img 
                                        src={freebie.image} 
                                        alt={freebie.name}
                                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                <div className='p-6'>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>{freebie.name}</h3>
                                    <p className='text-gray-600 mb-4'>{freebie.summary}</p>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <FullWidthButton
                                            onClick={() => handleDownload(freebie.bookPath, `${freebie.name}.pdf`)}
                                        >
                                            Download Now
                                        </FullWidthButton>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <Text>No freebies available at the moment. Check back soon!</Text>
                    </div>
                )}
            </div>
        </>
    );
}

export default FreebieLibrary; 