import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { RootState } from '../state/store';
import { VerticalsButton } from '../components/ui/Buttons';
import CuratedCard from '../components/ui/CuratedCard';
import JournalItem from '../components/ui/JournalItem';
import ProductCard from '../components/ui/ProductCard';
import { SubTitle, Typography, Text } from '../components/ui/Text';
import { ApothecaryToolTypes } from '../state/apothecary/types';
import { JournalTypes } from '../state/journal/types';
import { CuratedCategoryTypes } from '../state/product/types';
import { getAllJournalsAction } from '../state/journal/actions';
import SpinLoader from '../components/ui/SpinLoader';
import ExplosionEffect from '../components/ui/ExplosionEffect';

const Apothecary = () => {
    const dispatch = useAppDispatch();

    const { featuredTools } = useAppSelector((state: RootState) => state.apothecary);
    const { curatedCategories } = useAppSelector((state: RootState) => state.product);
    const apothecaryCuratedCategories = curatedCategories.filter(category => category.shift === 'Apothecary');

    const [isJournalLoading, setIsJournalLoading] = useState<boolean>(false);
    const [journals, setJournals] = useState<JournalTypes[]>([]);

    useEffect(() => {
        const fetchJournals = async () => {
            setIsJournalLoading(true);
            try {
                const result = await dispatch(getAllJournalsAction({
                    limit: '18',
                    shift: 'Apothecary',
                    sortBy: 'newest'
                })).unwrap();
                setJournals(result.journals || []);
            } catch(e) {
                console.error(e);
            } finally {
                setIsJournalLoading(false);
            }
        };
        fetchJournals();
    }, [dispatch]);

    return (
        <>
            <div className='pt-12 pb-24 apothecary-background-2'>
                <div className='container text-center'>
                    <div className='flex flex-col md:flex-row md:items-center md:space-x-4 rounded-lg mb-35 mt-25 md:mb-0 md:mt-0'>
                        <div className='w-full'>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className='mb-12 md:mb-48'
                            >
                                <h1
                                    className='font-playfair hidden md:block text-[60px] md:text-[100px] font-bold leading-[60px] md:leading-[100px] text-[#febd36]'
                                    style={{
                                        textShadow: `
                                            -1px -1px 0 #5b300d,  
                                            1px -1px 0 #5b300d,
                                            -1px 1px 0 #5b300d,
                                            1px 1px 0 #5b300d,
                                            0px 1px 0 #5b300d,
                                            1px 0px 0 #5b300d,
                                            0px -1px 0 #5b300d,
                                            -1px 0px 0 #5b300d
                                        `
                                    }}
                                >
                                    ZenShift
                                </h1>
                                <h2
                                    className='font-playfair hidden md:block text-[42px] md:text-[70px] uppercase font-bold leading-[70px] text-[#febd36] md:mb-4'
                                    style={{
                                        textShadow: `
                                            -1px -1px 0 #5b300d,  
                                            1px -1px 0 #5b300d,
                                            -1px 1px 0 #5b300d,
                                            1px 1px 0 #5b300d,
                                            0px 1px 0 #5b300d,
                                            1px 0px 0 #5b300d,
                                            0px -1px 0 #5b300d,
                                            -1px 0px 0 #5b300d
                                        `
                                    }}
                                >
                                    Apothecary
                                </h2>
                                <h3 className='font-playfair text-2xl md:text-4xl text-[#432808] font-semibold italic mb-4'>
                                    Energy You Can Feel
                                </h3>
                                <p className='font-playfair text-xl md:text-2xl text-[#432808]'>
                                    Curated tools to support your frequency, mood, and multidimensional system.
                                </p>
                            </motion.div>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                {/* <ExplosionEffect>
                                    <button
                                        className='py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#432808] bg-[#f4c24f] border border-[#432808] rounded-full hover:bg-[#432808] hover:text-[#f4c24f] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        Explore Remedies
                                    </button>
                                </ExplosionEffect>
                                <ExplosionEffect>
                                    <button
                                        className='py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#432808] bg-[#f4c24f] border border-[#432808] rounded-full hover:bg-[#432808] hover:text-[#f4c24f] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        Shop the Shift Store
                                    </button>
                                </ExplosionEffect>     */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>
                    Curated Categories
                </SubTitle>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                    {apothecaryCuratedCategories.map((category: CuratedCategoryTypes, index: number) => (
                        <CuratedCard
                            key={index}
                            imageSrc={category.imageSrc}
                            title={category.title}
                            category={category.category}
                            tooltip={`Learn more about ${category.title}`}
                        />
                    ))}
                </div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container pb-12 md:pb-24 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    What is Makes The Difference?
                </SubTitle>
                <Text>
                    Every product is <b>vetted for energetic quality</b>, ingredient integrity, and brand alignment. Only what resonates makes it into the Apothecary.
                </Text>
            </motion.div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>ZenShift Apothecary Journal</SubTitle>
                {isJournalLoading ? (
                    <SpinLoader className='flex-grow' size={50} />
                ) : journals.length === 0 ? (
                    <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                        <Typography className='text-gray-500'>
                            No apothecary journals found
                        </Typography>
                    </div>
                ) : (
                    <div className='flex flex-wrap justify-center gap-10'>
                        {journals.map((journal: JournalTypes, index: number) => (
                            <JournalItem
                                key={index}
                                id={journal._id}
                                src={journal.image}
                                title={journal.title}
                                vertical={journal.shift}
                                summary={journal.summary}
                            />
                        ))}
                    </div>
                )}
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2' hidden>
                        Explore More Insights
                    </VerticalsButton>
                </div>
            </div> 
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>
                    Transparency Disclaimer
                </SubTitle>
                <Text className='text-left mb-12'>
                    <b>Affiliate Notice:</b> Some products featured here are affiliate-linked. That means if you click and make a purchase, ZenShift may earn a small commission at no additional cost to you. We only share what energetically aligns — your support helps fuel this mission of conscious transformation.
                </Text>
                <Text className='text-left'>
                    <b>Medical Disclaimer:</b> Nothing on this site or within ZenShiftApothecary is intended to diagnose, treat, cure, or prevent any disease. This information is for energetic, educational, and inspirational purposes only. Always consult with a qualified medical professional before beginning any new wellness practice or supplement.
                </Text>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            {/* <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>
                    Featured Apothecary Tools
                </SubTitle>
                <Text className='mb-12'>
                    These are some of our current favorites from the Apothecary. Each tool is chosen to support your energetic well-being.
                </Text>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12'>
                    {featuredTools.map((tool: ApothecaryToolTypes, index: number) => (
                        <ProductCard
                            key={index}
                            src={tool.src}
                            title={tool.title}
                        />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2'>
                        View All Products
                    </VerticalsButton>
                </div>
            </div> */}
        </>
    );
};

export default Apothecary;
