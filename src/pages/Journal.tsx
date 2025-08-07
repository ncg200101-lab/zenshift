import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { FullWidthButton } from '../components/ui/Buttons';
import { Select } from '../components/ui/Select';
import JournalItem from '../components/ui/JournalItem';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';
import { getAllJournalsAction, getJournalTopicsAction } from '../state/journal/actions';
import { SortByTypes, JournalTypes } from '../state/journal/types';
import SpinLoader from '../components/ui/SpinLoader';

const verticalsOptions = [
    { value: '', label: 'All' },
    { value: 'Abundance', label: 'Abundance' },
    { value: 'Apothecary', label: 'Apothecary' },
    { value: 'Interior', label: 'Interior' },
    { value: 'Health', label: 'Health' },
    { value: 'ZenShift', label: 'ZenShift' },
    { value: 'ZenAI', label: 'ZenAI' },
];

const sortByOptions = [
    { value: 'newest', label: 'Latest Insight' },
    { value: 'alphabetical', label: 'Alphabetical' },
];

const JournalBlog = () => {
    const dispatch = useAppDispatch();
    const { topics } = useAppSelector((state) => state.journal);

    const [selectedVerticalsValue, setSelectedVerticalsValue] = useState<string>('ZenShift');
    const [selectedTopicsValue, setSelectedTopicsValue] = useState<string>('all-topics');
    const [selectedSortByValue, setSelectedSortByValue] = useState<string>('newest');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [journals, setJournals] = useState<JournalTypes[]>([]);
    const [email, setEmail] = useState<string>('');

    // Create topics options dynamically from API data
    const topicsOptions = [
        { value: 'all-topics', label: 'All Topics' },
        ...topics.map((topic: string) => ({ value: topic, label: topic }))
    ];

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        try {
            setIsLoading(true);
            console.log('Submitting data:', email);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, email]);

    // Fetch topics on component mount
    useEffect(() => {
        dispatch(getJournalTopicsAction());
    }, [dispatch]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true);
            try {
                const result = await dispatch(
                    getAllJournalsAction({
                        limit: '18',
                        shift: selectedVerticalsValue ? selectedVerticalsValue : undefined,
                        topic: selectedTopicsValue !== 'all-topics' ? selectedTopicsValue : undefined,
                        sortBy: selectedSortByValue as SortByTypes
                    })
                ).unwrap();
                setJournals(result.journals || []);
            } catch(e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
      }, [dispatch, selectedVerticalsValue, selectedTopicsValue, selectedSortByValue]);

    return (
        <>
            <div className='absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-[60px] md:top-[80px] left-0 -z-[1] -translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/blue-chakra.png' alt='' />
            </div>
            <div className='absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] top-[100px] right-0 -z-[1] translate-x-[50%] -translate-y-[50%] animate-opacity'>
                <img src='/assets/loader-images/light-blue-chakra.png' alt='' />
            </div>
            <div className='container pt-18 md:pt-36 pb-12 md:pb-24 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        The Shift Journal
                    </MainTitle>
                </motion.div>
                <Text>
                    A curated stream of insights, practices, and shifts from the ZenShift ecosystem.
                </Text>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <div className='flex flex-col md:flex-row justify-around items-center gap-4 mb-12 md:mb-24'>
                    <Select
                        options={verticalsOptions}
                        value={selectedVerticalsValue}
                        onChange={setSelectedVerticalsValue}
                        placeholder='All Portals'
                        isShowArrow={true}
                        className='flex items-center justify-between px-6 py-3 border border-black rounded-full bg-[#F9EEDD] text-black text-sm font-medium shadow-sm min-w-[200px]'
                    />
                    <Select
                        options={topicsOptions}
                        value={selectedTopicsValue}
                        onChange={setSelectedTopicsValue}
                        placeholder='Topics'
                        isShowArrow={true}
                        className='flex items-center justify-between px-6 py-3 border border-black rounded-full bg-[#F9EEDD] text-black text-sm font-medium shadow-sm min-w-[200px]'
                    />
                    <Select
                        options={sortByOptions}
                        value={selectedSortByValue}
                        onChange={setSelectedSortByValue}
                        placeholder='Sort By'
                        isShowArrow={true}
                        className='flex items-center justify-between px-6 py-3 border border-black rounded-full bg-[#F9EEDD] text-black text-sm font-medium shadow-sm min-w-[200px]'
                    />
                </div>
                {isLoading ? (
                    <SpinLoader className='flex-grow' size={50} />
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
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24'>
                <SubTitle className='mb-4 md:mb-8 text-center'>
                    Stay in the Field.
                </SubTitle>
                <Text className='mb-4 md:mb-8 text-center'>
                    This is more than a list. It’s a frequency.
                    <br />
                    Enter your email to keep receiving resonance.     
                </Text>
                <div className='email-form'>
                    <form className='flex flex-col items-center md:flex-row gap-6' onSubmit={handleSubmit}>
                        <div className='w-full'>
                            <label htmlFor='email' className='sr-only'>Email Address</label>
                            <input 
                                type='email' 
                                id='email' 
                                name='email' 
                                placeholder='Enter your email' 
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className='w-full bg-white px-4 py-3 mt-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.6 }}
                            className='w-full'
                        >
                            <FullWidthButton type='submit'>
                                Keep Me in the Current
                            </FullWidthButton>
                        </motion.div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default JournalBlog;