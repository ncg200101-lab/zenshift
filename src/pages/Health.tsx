import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { VerticalsButton } from '../components/ui/Buttons';
import CuratedCard from '../components/ui/CuratedCard';
import BlogPost from '../components/ui/BlogPost';
import ResourceCard from '../components/ui/ResourceCard';
import { RootState } from '../state/store';
import { SubTitle, Typography, Text } from '../components/ui/Text';
import { getAllHealthBlogPostsAction } from '../state/health/actions';
import { RecommendedResourceTypes } from '../state/health/types';
import { BlogPostTypes } from '../state/global/types';
import { CuratedCategoryTypes } from '../state/product/types';
import SpinLoader from '../components/ui/SpinLoader';
import ExplosionEffect from '../components/ui/ExplosionEffect';

const Health = () => {
    const dispatch = useAppDispatch();

    const { recommendedResources } = useAppSelector((state: RootState) => state.health);

    const [isBlogLoading, setIsBlogLoading] = useState<boolean>(false);
    const [blogPosts, setBlogPosts] = useState<BlogPostTypes[]>([]);
    const { curatedCategories } = useAppSelector((state: RootState) => state.product);
    const healthCuratedCategories = curatedCategories.filter(category => category.shift === 'Health');

    useEffect(() => {
        const fetchBlogPost = async () => {
            setIsBlogLoading(true);
            try {
                const result = await dispatch(getAllHealthBlogPostsAction()).unwrap();
                setBlogPosts(result);
            } catch(e) {
                console.error(e);
            } finally {
                setIsBlogLoading(false);
            }
        };
        fetchBlogPost();
    }, [dispatch]);

    return (
        <>
            <div className='pt-12 md:pt-24 pb-24 health-background-2'>
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
                                    className='font-playfair text-[60px] md:text-[100px] font-bold leading-[60px] md:leading-[100px] text-[#edf9ef] mb-6 md:mb-12'
                                    style={{
                                        textShadow: `
                                            -1px -1px 0 #15675e,  
                                            1px -1px 0 #15675e,
                                            -1px 1px 0 #15675e,
                                            1px 1px 0 #15675e,
                                            0px 1px 0 #15675e,
                                            1px 0px 0 #15675e,
                                            0px -1px 0 #15675e,
                                            -1px 0px 0 #15675e
                                        `
                                    }}
                                >
                                    ZenShift Health
                                </h1>
                                <p
                                    className='font-playfair text-2xl md:text-4xl text-[#edf9ef] mx-auto'
                                    style={{
                                        textShadow: `
                                            -1px -1px 0 #15675e,  
                                            1px -1px 0 #15675e,
                                            -1px 1px 0 #15675e,
                                            1px 1px 0 #15675e,
                                            0px 1px 0 #15675e,
                                            1px 0px 0 #15675e,
                                            0px -1px 0 #15675e,
                                            -1px 0px 0 #15675e
                                        `
                                    }}
                                >
                                    Energetic Health for a Higher Frequency Life
                                </p>
                            </motion.div>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                <ExplosionEffect>
                                    <button
                                        className='flex items-center gap-2 py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#edf9ef] bg-[#2e8d8599] border border-[#edf9ef] rounded-full hover:bg-[#edf9ef] hover:text-[#2e8d85] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        <img className='w-7 md:w-10' src='/assets/health/leaf.png' alt='' />
                                        Explore Remedies
                                    </button>
                                </ExplosionEffect>
                                <ExplosionEffect>
                                    <button
                                        className='flex items-center gap-2 py-2 md:py-4 px-4 md:px-8 text-xl md:text-3xl text-[#edf9ef] bg-[#2e8d8599] border border-[#edf9ef] rounded-full hover:bg-[#edf9ef] hover:text-[#2e8d85] hover:scale-[1.02] transition-all duration-300'
                                    >
                                        <img className='w-7 md:w-10' src='/assets/health/star.png' alt='' />
                                        Shop Prosperity Tools
                                    </button>
                                </ExplosionEffect>    
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
                    {healthCuratedCategories.map((category: CuratedCategoryTypes, index: number) => (
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
                    The New Way of Healing
                </SubTitle>
                <Text>
                We're no longer treating the body as separate from energy. This is integrated wellness: frequency meets physiology, inner meets outer, and sovereignty meets science.
                </Text>
            </motion.div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <SubTitle className='mb-8 md:mb-16'>
                    ZenShift Health Blog
                </SubTitle>
                {isBlogLoading ? (
                    <SpinLoader className='flex-grow' size={50} />
                ) : blogPosts.length === 0 ? (
                    <div className='container flex flex-grow items-center justify-center py-12 md:py-20'>
                        <Typography className='text-gray-500'>
                            Product not found
                        </Typography>
                    </div>
                ) : (
                    <div className='flex justify-center mb-12'>
                        <div className='space-y-8'>
                            {blogPosts.map((post: BlogPostTypes, index: number) => (
                                <BlogPost
                                    key={index}
                                    id={post._id}
                                    title={post.title}
                                    description={post.description}
                                    imageSrc={post.imageSrc?.[0] || ''}
                                    readTime={post?.readTime || ''}
                                    date={post.createdAt || ''}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2'>
                        Explore More Insights
                    </VerticalsButton>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container text-center py-12 md:py-24'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Get Started Free
                </SubTitle>
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2'>
                        Access the ZenShiftHealth Starter Pack
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
                <div className='flex flex-wrap gap-4 md:gap-8 mb-6 md:mb-12'>
                    {recommendedResources.map((resource: RecommendedResourceTypes, index: number) => (
                        <ResourceCard
                            key={index}
                            imageSrc={resource.src}
                            title={resource.title}
                        />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <VerticalsButton leftColor='#763AF5' rightColor='#9F0CF2'>
                        View Tools for the Body + Field
                    </VerticalsButton>
                </div>
                <Text className='mt-6'>
                    Note: We only recommend what aligns. Some links may be affiliate.
                </Text>
            </div>
        </>
    );
};

export default Health;