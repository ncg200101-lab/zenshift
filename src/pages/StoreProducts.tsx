import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';
import { MainTitle, SubTitle, Typography, Text } from '../components/ui/Text';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import { Select } from '../components/ui/Select';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import { getAllProductsAction } from '../state/product/actions';
import SpinLoader from '../components/ui/SpinLoader';
import { ProductTypes, SortByTypes, CategoryTypes, FrequencyStyleTypes } from '../state/product/types';

interface CategoryCardProps {
    id: string;
    src: string;
    title: string;
    description?: string;
    rating?: number;
    price?: number;
    className?: string;
    isEnabledSubHeading: boolean,
    isEnabledIntroBlock: boolean
}

const isProductCategoryType = (value: any): value is CategoryTypes => {
    return [
        'abundance-field',
        'books-journals',
        'digital-codes',
        'frequency-drops',
        'apparel-accessories',
        'home-energy-tools',
        'journals-accessories',
        'mugs-drinkware',
        'energetic-atmosphere',
        'flow-mapping',
        'intentional-objects',
        'light-tone',
        'energy-immune-flow',
        'everyday-ascension-care',
        'gut-mood-harmony',
        'nervous-system-reset'
    ].includes(value);
};

const CategoryCard = ({
    id, src, title, description, rating, price, className, isEnabledSubHeading, isEnabledIntroBlock
}: CategoryCardProps) => {
    const navigate = useNavigate();

    const handleGotoCheckout = useCallback(() => {
        navigate(`/checkout/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate, id]);

    const handleGotoProduct = useCallback(() => {
        navigate(`/product/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate, id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className={`relative bg-[#18051B] rounded-xl overflow-hidden shadow-lg w-full max-w-xs mx-auto hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] group ${className || ''}`}
        >
            <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8}>
                <div className='relative p-4'>
                    <img src={src} alt={title} className='bg-white w-full h-full object-cover rounded-lg' />
                    {rating && (
                        <span className='absolute top-[15px] right-[15px] bg-black text-[#FFE600] text-xs font-bold px-2 py-1 rounded-full rounded-r-none rounded-t-none flex items-center'>
                            ⭐ {rating}
                        </span>
                    )}
                </div>
                <div className='p-4 pb-8 text-center'>
                    {isEnabledSubHeading && <h3 className='text-white text-start text-lg font-bold mb-1'>{title}</h3>}
                    {isEnabledIntroBlock && <p className='text-white text-start mb-1'>{description}</p>}
                    <div className='text-start' onClick={handleGotoProduct}>
                        <button className='text-[#FFE600]' >
                            Learn More
                        </button>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h4 className='text-white text-start text-lg font-bold'>
                            ${price}
                        </h4>
                        <button 
                            onClick={handleGotoCheckout}
                            className='bg-[#A823F9] text-white py-2 px-4 rounded-full font-bold transition-all duration-300 hover:bg-opacity-90 hover:shadow-[0_0_10px_rgba(255,230,77,0.5)]'
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </ExplosionEffect>
        </motion.div>
    );
};

const AllProducts = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const { curatedCategories } = useAppSelector((state: RootState) => state.product);

    const currentCuratedCategory = curatedCategories.find(category => category.category === id);

    const filterByOptions = [
        { value: '', label: 'All Types' },
        { value: 'Modern', label: 'Modern' },
        { value: 'Rustic', label: 'Rustic' },
        { value: 'Minimalist', label: 'Minimalist' },
    ];

    const sortByOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'price', label: 'Price Range' },
    ];

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1); 
    const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');
    const [selectedSortValue, setSelectedSortValue] = useState<string>('newest');
    const [isEnabledSubHeading, setIsEnabledSubHeading] = useState<boolean>(true);
    const [isEnabledIntroBlock, setIsEnabledIntroBlock] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true);
            try {
                if (id) {
                    const result = await dispatch(
                        getAllProductsAction({
                            page: currentPage.toString(),
                            limit: '18',
                            style: selectedFilterValue as FrequencyStyleTypes | undefined,
                            category: id as CategoryTypes | undefined,
                            sortBy: selectedSortValue as SortByTypes | undefined
                        })
                    ).unwrap();
                    console.log(result)
                    setProducts(result.products || []);
                    setTotalPages(result.totalPages || 1);
                }
            } catch(e) {
                console.error(e);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
      }, [dispatch, selectedFilterValue, selectedSortValue, currentPage, id]);

    if (!isProductCategoryType(id)) {
        return (
            <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                <Typography className='text-gray-500'>
                    Category not found
                </Typography>
            </div>
        );
    }

    return (
        <>
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='mb-8 md:mb-16'
                    >
                        <MainTitle>
                            {currentCuratedCategory?.title || ''}
                        </MainTitle>
                    </motion.div>
                    <Text className='mb-12'>
                        Your gut is your second brain. These tools restore coherence from within—because mood is magnetic.
                    </Text>
                </div>
                <div className='flex flex-wrap gap-4 items-center justify-around bg-white border-[#00000042] shadow-lg rounded-xl p-4 mb-12'>
                    <Select
                        options={sortByOptions}
                        value={selectedSortValue}
                        onChange={setSelectedSortValue}
                        placeholder='Sort By'
                        className='w-56 bg-[#A823F9] border-none text-white text-base'
                        prefix='Sort By: '
                    />
                    <Select
                        options={filterByOptions}
                        value={selectedFilterValue}
                        onChange={setSelectedFilterValue}
                        placeholder='Filter By'
                        isShowArrow={true}
                        className='w-56'
                    />
                    <ToggleSwitch
                        isEnabled={isEnabledSubHeading}
                        onToggle={setIsEnabledSubHeading}
                        size='lg'
                        label='Show/hide subheading'
                        disabled={false}
                    />
                    <ToggleSwitch
                        isEnabled={isEnabledIntroBlock}
                        onToggle={setIsEnabledIntroBlock}
                        size='lg'
                        label='Show/hide intro block'
                        disabled={false}
                    />
                </div>
                <div>
                    <SubTitle className='mb-12'>
                        Products
                    </SubTitle>
                    {isLoading ? (
                        <SpinLoader className='flex-grow' size={50} />
                    ) : (
                        <>
                            <div className='branded-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                {products.map((product, index) => (
                                    <CategoryCard
                                        key={index}
                                        id={product._id}
                                        src={product?.image}
                                        title={product.name}
                                        description={product.description}
                                        rating={product.rating}
                                        price={product.price}
                                        isEnabledSubHeading={isEnabledSubHeading}
                                        isEnabledIntroBlock={isEnabledIntroBlock}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-center mt-8 gap-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    
                </div>
            </div>
        </>
    )
}

export default AllProducts;