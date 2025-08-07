import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { RootState } from '../state/store';
import { VerticalsButton } from '../components/ui/Buttons';
import JournalItem from '../components/ui/JournalItem';
import CuratedCard from '../components/ui/CuratedCard';
import ResourceCard from '../components/ui/ResourceCard';
import { SubTitle, Typography, Text } from '../components/ui/Text';
import { RecommendedResourceTypes } from '../state/abundance/types';
import { JournalTypes } from '../state/journal/types';
import { CuratedCategoryTypes } from '../state/product/types';
import { getAllJournalsAction } from '../state/journal/actions';
import SpinLoader from '../components/ui/SpinLoader';
import ExplosionEffect from '../components/ui/ExplosionEffect';

const Abundance = () => {
    const dispatch = useAppDispatch();
    const { recommendedResources } = useAppSelector((state: RootState) => state.abundance);
    const { curatedCategories } = useAppSelector((state: RootState) => state.product);
    const abundanceCuratedCategories = curatedCategories.filter(category => category.shift === 'Abundance');

    const [isJournalLoading, setIsJournalLoading] = useState<boolean>(false);
    const [journals, setJournals] = useState<JournalTypes[]>([]);

    useEffect(() => {
        const fetchJournals = async () => {
            setIsJournalLoading(true);
            try {
                const result = await dispatch(getAllJournalsAction({
                    limit: '18',
                    shift: 'Abundance',
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
            <div className='pt-12 md:pt-24 pb-24 abundance-background-2'>
                <div className='container text-center'>
                    <div className='flex flex-col md:flex-row md:items-center md:space-x-4 rounded-lg'>
                        <div className='w-full'>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className='mb-12 md:mb-24'
                            >
                                <h1
                                    className='font-playfair text-[60px] md:text-[100px] font-bold leading-[60px] md:leading-[100px] text-[#febd36]'
                                    style={{
                                        textShadow: `
                                            -1px -1px 0 #643e24,  
                                            1px -1px 0 #643e24,
                                            -1px 1px 0 #643e24,
                                            1px 1px 0 #643e24,
                                            0px 1px 0 #643e24,
                                            1px 0px 0 #643e24,
                                            0px -1px 0 #643e24,
                                            -1px 0px 0 #643e24
                                        `
                                    }}
                                >
                                    ZenShift
                                </h1>
                                <h2
                                    className='font-playfair text-[42px] md:text-[70px] uppercase font-bold leading-[70px] text-[#febd36] md:mb-4'
                                    style={{
                                        textShadow: `
                                            -1px -1px 0 #643e24,  
                                            1px -1px 0 #643e24,
                                            -1px 1px 0 #643e24,
                                            1px 1px 0 #643e24,
                                            0px 1px 0 #643e24,
                                            1px 0px 0 #643e24,
                                            0px -1px 0 #643e24,
                                            -1px 0px 0 #643e24
                                        `
                                    }}
                                >
                                    Abundance
                                </h2>
                                <h3 className='font-playfair text-2xl md:text-4xl font-semibold text-[#391c58] italic mb-4 md:mb-8'>
                                    Wealth Is a Frequency
                                </h3>
                                <p className='font-playfair text-xl md:text-2xl text-[#391c58]'>
                                    Unlock energetic overflow, receiving, and limitless expansion.
                                </p>
                            </motion.div>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                {/* <ExplosionEffect>
                                    <button
                                        className='py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#391c58] bg-[#f8c035] border border-[#391c58] rounded-full hover:bg-[#391c58] hover:text-[#f8c035] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        Explore Remedies
                                    </button>
                                </ExplosionEffect>
                                <ExplosionEffect>
                                    <button
                                        className='py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#391c58] bg-[#f8c035] border border-[#391c58] rounded-full hover:bg-[#391c58] hover:text-[#f8c035] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        Shop Prosperity Tools
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
                    {abundanceCuratedCategories.map((category: CuratedCategoryTypes, index: number) => (
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
                    The Frequency of Overflow
                </SubTitle>
                <Text>
                    Abundance isn't earned. It's received. When your field is coherent, your life reflects it. This portal is about <b>healing your money story,</b> deconstructing scarcity, and <b>stepping into overflow</b>
                </Text>
            </motion.div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>ZenShift Abundance Journal</SubTitle>
                {isJournalLoading ? (
                    <SpinLoader className='flex-grow' size={50} />
                ) : journals.length === 0 ? (
                    <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                        <Typography className='text-gray-500'>
                            No abundance journals found
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
            {/* <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container text-center py-12 md:py-24'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Get Started Free
                </SubTitle>
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2' hidden>
                        Get Access Abundance Tools
                    </VerticalsButton>
                </div>
            </motion.div>
            <div className='container pb-12 md:pb-24 text-center'>
                <SubTitle className='mb-6 md:mb-12'>
                    Recommended Resources
                </SubTitle>
                <Text className='mb-12'>
                    Tools to support your abundance recalibration. Carefully curated for frequency, not hype.
                </Text>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-6 md:mb-12'>
                    {recommendedResources.map((resource: RecommendedResourceTypes, index: number) => (
                        <ResourceCard
                            key={index}
                            imageSrc={resource.src}
                            title={resource.title}
                        />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2' hidden>
                        View Recommended Tools
                    </VerticalsButton>
                </div>
                <Text className='mt-6'>
                    Note: Some links are affiliate. We only share what aligns.
                </Text>
            </div> */}
        </>
    );
};

export default Abundance;