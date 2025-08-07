import { motion } from 'framer-motion';
import { useCallback, useState, useEffect, FormEvent, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import ExplosionEffect from '../components/ui/ExplosionEffect';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import {
    generateZenaiText,
    fetchZenaiHistoryTitle,
    getZenaiHistoryEntry
} from '../state/zenai/actions';
import { ZenaiHistory, ZenaiHistoryEntry, ZenaiHistoryTitle } from '../state/zenai/types';
import { useZenaiStream } from '../hooks/useZenaiStream';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

const ZenAiChat = () => {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.user.name);
    const { response, loading, error, generate } = useZenaiStream();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState<3 | 4>(3);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [askText, setAskText] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [allTitleLists, setAllTitleLists] = useState<ZenaiHistoryTitle[]>([]);
    const [zenaiHistoryData, setZenaiHistoryData] = useState<ZenaiHistory | undefined>(undefined);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const [hasAskedFirstQuestion, setHasAskedFirstQuestion] = useState<boolean>(false);

    const handleClick = useCallback((link?: string) => () => {
        if (link) {
            navigate(link);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate]);

    const handleAskText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAskText(e.target.value);
    }, []);

    const handleClickItem = useCallback((id: string) => () => {
        setSelectedId(id);
        getZenaiHistory(id);
    }, []);

    const handleNewChatClick = useCallback(() => {
        setSelectedId(undefined);
        setZenaiHistoryData(undefined);
    }, []);

    const handleZenaiContentItemClick = (text: string) => async () => {
        if (isSubmitLoading) return;
        
        try {
            setIsSubmitLoading(true);
            // const data = await dispatch(generateZenaiText({
            //     input_text: text,
            //     zenai_model_id: selectedId === undefined ? null: selectedId
            // })).unwrap();
            // await fetchAllHistoryTitle();
            // setSelectedId(data.zenai_model_id);
            // getZenaiHistory(data.zenai_model_id);
            generate(text, null);
            setAskText('');
            setHasAskedFirstQuestion(true);
        } catch(e) {
            console.error(e);
        } finally {
            setIsSubmitLoading(false);
        }
    }

    const onGenerate = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitLoading) return;
        
        try {
            setIsSubmitLoading(true);
            // const data = await dispatch(generateZenaiText({
            //     input_text: askText,
            //     zenai_model_id: selectedId === undefined ? null: selectedId
            // })).unwrap();
            // await fetchAllHistoryTitle();
            // setSelectedId(data.zenai_model_id);
            // getZenaiHistory(data.zenai_model_id);
            setQuestion(askText);
            generate(askText, null);
            setAskText('');
            setHasAskedFirstQuestion(true);
        } catch(e) {
            console.error(e);
        } finally {
            setIsSubmitLoading(false);
        }
    }, [dispatch, isSubmitLoading, askText, allTitleLists, selectedId]);

    const fetchAllHistoryTitle = async () => {
        try {
            const data = await dispatch(fetchZenaiHistoryTitle()).unwrap();
            setAllTitleLists(data.titles || []);
        } catch(e) {
            console.error(e);
        } finally {
            
        }
    };

    const getZenaiHistory = async (zenai_model_id: string) => {
        try {
            setIsLoading(true);
            const data = await dispatch(getZenaiHistoryEntry({
                zenai_model_id
            })).unwrap();
            setZenaiHistoryData(data.history || undefined);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchAllHistoryTitle();
    // }, []);

    // Reset guidance phrase state when component unmounts (user exits portal)
    useEffect(() => {
        return () => {
            setHasAskedFirstQuestion(false);
        };
    }, []);

    return (
        <div className='min-h-screen max-h-screen bg-white flex flex-col'>
            <div className='relative h-screen flex'>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='md:hidden fixed top-4 left-4 z-[50] p-2 rounded-lg bg-white shadow-lg cursor-pointer'
                >
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M4 6H20M4 12H20M4 18H20' stroke='#1B2559' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                </button>
                
                <div className={`fixed flex-col flex top-0 left-0 bottom-0 w-[280px] pb-6 pt-6 md:pt-12 shadow-xl rounded-xl bg-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} z-[100]`}>
                    <button className='fill-button px-4 py-2 text-base md:text-lg w-fit mx-auto mb-6' onClick={handleClick('/')}>
                        Return to Zenshift
                    </button>
                    <a href='/dashboard' className='text-2xl md:text-4xl font-playfair text-[#1B2559] font-bold text-center cursor-pointer mb-6'>
                        ZenAI
                    </a>
                    <div className='w-full h-[1px] bg-[#E9EDF7]' />
                    <div className='flex-grow py-4 md:py-8 px-3 md:px-6 overflow-y-auto'>
                        <div className='flex justify-center mb-6'>
                            <button
                                className='font-plus-jakarta-sans md:w-auto cursor-pointer py-1 md:py-2 px-4 md:px-8 text-white rounded-full quad-gradient text-base'
                                onClick={handleNewChatClick}
                            >
                                New Chat
                            </button>
                        </div>
                        {/* <div className='flex items-center gap-x-2 mb-6'>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M19.3001 7.55C19.2168 7.55 19.1459 7.53333 19.0876 7.5C19.0293 7.46667 18.9834 7.40833 18.9501 7.325L18.2251 5.625L16.4001 4.825C16.3168 4.79167 16.2584 4.74583 16.2251 4.6875C16.1918 4.62917 16.1751 4.55833 16.1751 4.475C16.1751 4.39167 16.1918 4.32083 16.2251 4.2625C16.2584 4.20417 16.3168 4.15833 16.4001 4.125L18.2251 3.35L18.9501 1.725C18.9834 1.64167 19.0293 1.58333 19.0876 1.55C19.1459 1.51667 19.2168 1.5 19.3001 1.5C19.3834 1.5 19.4543 1.51667 19.5126 1.55C19.5709 1.58333 19.6168 1.64167 19.6501 1.725L20.3751 3.35L22.2001 4.125C22.2834 4.15833 22.3418 4.20417 22.3751 4.2625C22.4084 4.32083 22.4251 4.39167 22.4251 4.475C22.4251 4.55833 22.4084 4.62917 22.3751 4.6875C22.3418 4.74583 22.2834 4.79167 22.2001 4.825L20.3751 5.625L19.6501 7.325C19.6168 7.40833 19.5709 7.46667 19.5126 7.5C19.4543 7.53333 19.3834 7.55 19.3001 7.55Z' fill='#4318FF' />
                            </svg>
                            <p className='text-[#1B2559] font-plus-jakarta-sans font-semibold text-xl'>Chat History</p>
                        </div> */}
                        {/* <ul className='space-y-2'>
                            {allTitleLists.map((item: ZenaiHistoryTitle, index: number) => (
                                <li
                                    key={index}
                                    className={`truncate text-[#718096] font-plus-jakarta-sans cursor-pointer py-2 px-2 rounded-xl text-sm ${selectedId === item._id && !isLoading ? 'bg-gray-100' : ''}`}
                                    onClick={handleClickItem(item._id)}
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul> */}
                    </div>
                    {/* <div className='px-4 md:px-8'>
                        <div className='w-full flex items-center shadow-xl py-2 px-4 gap-x-2 rounded-full'>
                            <div className='w-10 h-10'>
                                <img className='w-full h-full rounded-full' src='/assets/users/user-1.jpg' alt='' />
                            </div>
                            <p className='flex-grow font-plus-jakarta-sans text-[#1B2559]'>
                                {userName || 'Guest'}
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.6 }}
                            >
                                <button className='border border-[#E0E5F2] w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100 cursor-pointer'>
                                    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M9.91812 9.9136C9.77968 9.77592 9.71046 9.61188 9.71046 9.42148C9.71046 9.2311 9.77968 9.06915 9.91812 8.93564L11.164 7.69652H5.86276C5.66718 7.69652 5.50238 7.62957 5.36833 7.49568C5.23428 7.36177 5.16726 7.19713 5.16726 7.00176C5.16726 6.80639 5.23428 6.64277 5.36833 6.51091C5.50238 6.37905 5.66718 6.31312 5.86276 6.31312H11.1289L9.85552 5.04667C9.72879 4.92633 9.66708 4.77253 9.67038 4.58528C9.67369 4.39804 9.74582 4.23527 9.88676 4.09697C10.0187 3.95867 10.1837 3.89117 10.3816 3.89447C10.5795 3.89775 10.7477 3.96823 10.8862 4.10591L13.3307 6.5371C13.4019 6.60958 13.4543 6.6873 13.4879 6.77027C13.5215 6.85326 13.5384 6.9384 13.5384 7.02571C13.5384 7.11302 13.5215 7.19714 13.4879 7.27805C13.4543 7.35896 13.4019 7.43543 13.3307 7.50746L10.8938 9.93106C10.7671 10.0571 10.609 10.1201 10.4197 10.1201C10.2304 10.1201 10.0632 10.0513 9.91812 9.9136Z' fill='#1B2559' />
                                    </svg>
                                </button>
                            </motion.div>
                        </div>
                    </div> */}
                </div>

                {/* Main */}
                <div className='w-full md:ml-[280px] p-4 md:p-5 flex flex-col h-full flex-1'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
                        <div className='text-xl md:text-4xl text-[#1B2559] font-plus-jakarta-sans font-semibold'>
                            <p className='pl-12 md:pl-0'>Begin Your Dialogue with the Field.</p>
                            <p className='text-xs md:text-xl text-[#1B2559] font-plus-jakarta-sans mt-4 max-w-3xl'>
                                ZenAI is your evolving resonance companion — blending conscious insight with intelligent response to guide your shift.
                            </p>
                        </div>
                        
                        {/* <div className='flex items-center shadow-xl py-2 px-4 gap-x-4 rounded-full w-full md:w-auto'>
                            <div className='relative bg-[#F4F7FE] rounded-full w-full md:w-[200px]'>
                                <div className='w-3 absolute top-1/2 left-3 transform -translate-y-[50%]'>
                                    <svg viewBox='0 0 11 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <circle cx='5' cy='5' r='4.3' stroke='#1B2559' strokeWidth='1.4' />
                                        <line x1='10.0101' y1='11' x2='8' y2='8.98995' stroke='#1B2559' strokeWidth='1.4' strokeLinecap='round' />
                                    </svg>
                                </div>
                                <input 
                                    placeholder='Search'
                                    className='w-full bg-[#F4F7FE] pl-8 pr-4 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                />
                            </div>
                            <div className='hidden md:flex items-center gap-x-4'>
                                <div className='cursor-pointer'>
                                    <svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M15.2901 15.29L14.0001 14V9C14.0001 5.93 12.3601 3.36 9.50005 2.68V2C9.50005 1.17 8.83005 0.5 8.00005 0.5C7.17005 0.5 6.50005 1.17 6.50005 2V2.68C3.63005 3.36 2.00005 5.92 2.00005 9V14L0.710051 15.29C0.0800515 15.92 0.520051 17 1.41005 17H14.5801C15.4801 17 15.9201 15.92 15.2901 15.29ZM12.0001 15H4.00005V9C4.00005 6.52 5.51005 4.5 8.00005 4.5C10.4901 4.5 12.0001 6.52 12.0001 9V15ZM8.00005 20C9.10005 20 10.0001 19.1 10.0001 18H6.00005C6.00005 19.1 6.89005 20 8.00005 20Z' fill='#718096' />
                                    </svg>
                                </div>
                                <div className='cursor-pointer'>
                                    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M9.95703 18C12.733 18 15.2684 16.737 16.9481 14.6675C17.1966 14.3613 16.9256 13.9141 16.5416 13.9872C12.1751 14.8188 8.16522 11.4709 8.16522 7.06303C8.16522 4.52398 9.52444 2.18914 11.7335 0.931992C12.074 0.738211 11.9884 0.221941 11.6015 0.150469C11.059 0.0504468 10.5086 8.21369e-05 9.95703 0C4.98914 0 0.957031 4.02578 0.957031 9C0.957031 13.9679 4.98281 18 9.95703 18Z' fill='#718096' />
                                    </svg>
                                </div>
                                <div className='cursor-pointer'>
                                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M9 5H11V7H9V5ZM10 15C10.55 15 11 14.55 11 14V10C11 9.45 10.55 9 10 9C9.45 9 9 9.45 9 10V14C9 14.55 9.45 15 10 15ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z' fill='#718096' />
                                    </svg>
                                </div>
                                <div className='cursor-pointer w-10 h-10'>
                                    <img className='w-full h-full rounded-full' src='/assets/users/user-1.jpg' alt='' />
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className='flex justify-center gap-x-4 mb-8'>
                        <div
                            className={`flex items-center gap-x-2 py-2 px-4 rounded-xl cursor-pointer transition-all duration-300 ${isActive === 3 ? 'shadow-xl opacity-100' : 'opacity-40'}`}
                            onClick={() => setIsActive(3)}
                        >
                            <div className='w-8 h-8 md:w-10 md:h-10 flex justify-center items-center bg-gradient-to-br from-[#FBFBFF] to-[#CACAFF] rounded-full'>
                                <svg className='w-3 h-3 md:w-4 md:h-4' viewBox='40 8 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <g filter='url(#filter0_d_264_1868)'>
                                        <path d='M53.6937 13.6205C53.6322 13.6205 53.58 13.6078 53.5369 13.5823C53.4938 13.5569 53.46 13.5123 53.4354 13.4487L52.9004 12.1504L51.5535 11.5394C51.492 11.5139 51.449 11.4789 51.4244 11.4344C51.3998 11.3898 51.3875 11.3357 51.3875 11.2721C51.3875 11.2084 51.3998 11.1543 51.4244 11.1098C51.449 11.0652 51.492 11.0302 51.5535 11.0048L52.9004 10.4129L53.4354 9.17184C53.46 9.10819 53.4938 9.06364 53.5369 9.03819C53.58 9.01273 53.6322 9 53.6937 9C53.7552 9 53.8075 9.01273 53.8506 9.03819C53.8936 9.06364 53.9274 9.10819 53.952 9.17184L54.4871 10.4129L55.8339 11.0048C55.8954 11.0302 55.9385 11.0652 55.9631 11.1098C55.9877 11.1543 56 11.2084 56 11.2721C56 11.3357 55.9877 11.3898 55.9631 11.4344C55.9385 11.4789 55.8954 11.5139 55.8339 11.5394L54.4871 12.1504L53.952 13.4487C53.9274 13.5123 53.8936 13.5569 53.8506 13.5823C53.8075 13.6078 53.7552 13.6205 53.6937 13.6205ZM53.6937 25C53.6445 25 53.5953 24.9873 53.5461 24.9618C53.4969 24.9364 53.46 24.8918 53.4354 24.8282L52.9004 23.5871L51.572 22.9952C51.5105 22.9698 51.4674 22.9348 51.4428 22.8902C51.4182 22.8457 51.4059 22.7916 51.4059 22.7279C51.4059 22.6643 51.4182 22.6102 51.4428 22.5656C51.4674 22.5211 51.5105 22.4861 51.572 22.4606L52.9004 21.8687L53.4354 20.5513C53.46 20.4877 53.4938 20.4431 53.5369 20.4177C53.58 20.3922 53.6322 20.3795 53.6937 20.3795C53.7552 20.3795 53.8075 20.3922 53.8506 20.4177C53.8936 20.4431 53.9274 20.4877 53.952 20.5513L54.4871 21.8687L55.8155 22.4606C55.877 22.4861 55.92 22.5211 55.9446 22.5656C55.9692 22.6102 55.9815 22.6643 55.9815 22.7279C55.9815 22.7916 55.9692 22.8457 55.9446 22.8902C55.92 22.9348 55.877 22.9698 55.8155 22.9952L54.4871 23.5871L53.952 24.8282C53.9274 24.8918 53.8905 24.9364 53.8413 24.9618C53.7921 24.9873 53.7429 25 53.6937 25ZM45.5941 21.6969C45.4957 21.6969 45.4004 21.6683 45.3081 21.611C45.2159 21.5537 45.1451 21.4741 45.0959 21.3723L43.8967 18.7184L41.3137 17.5155C41.2153 17.4646 41.1384 17.3914 41.083 17.2959C41.0277 17.2005 41 17.1018 41 17C41 16.8982 41.0277 16.7995 41.083 16.7041C41.1384 16.6086 41.2153 16.5354 41.3137 16.4845L43.8967 15.2816L45.0959 12.6468C45.1451 12.5322 45.2159 12.4463 45.3081 12.389C45.4004 12.3317 45.4957 12.3031 45.5941 12.3031C45.6925 12.3031 45.7878 12.3317 45.8801 12.389C45.9723 12.4463 46.0431 12.5259 46.0923 12.6277L47.31 15.2816L49.8745 16.4845C49.9852 16.5354 50.0683 16.6086 50.1236 16.7041C50.179 16.7995 50.2066 16.8982 50.2066 17C50.2066 17.1018 50.179 17.2005 50.1236 17.2959C50.0683 17.3914 49.9852 17.4646 49.8745 17.5155L47.31 18.7184L46.0923 21.3723C46.0431 21.4869 45.9723 21.5696 45.8801 21.6205C45.7878 21.6714 45.6925 21.6969 45.5941 21.6969Z' fill='#603CFF' />
                                    </g>
                                </svg>
                            </div>
                            <p className='text-[#120F43] font-semibold text-sm md:text-base font-plus-jakarta-sans'>Core</p>
                        </div>
                        <div 
                            className={`flex items-center gap-x-2 py-2 px-4 rounded-xl cursor-pointer transition-all duration-300 ${isActive === 4 ? 'shadow-xl opacity-100' : 'opacity-40'}`}
                            onClick={() => setIsActive(4)}
                        >
                            <div className='w-8 h-8 md:w-10 md:h-10 flex justify-center items-center bg-gradient-to-br from-[#FBFBFF] to-[#CACAFF] rounded-full'>
                                <svg className='w-3 h-3 md:w-4 md:h-4' viewBox='40 8 13 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <g filter='url(#filter0_d_264_1873)'>
                                        <path d='M44.5087 19.0878H41.5617C41.3401 19.0878 41.1761 18.9908 41.0697 18.7967C40.9634 18.6026 40.9787 18.4129 41.1157 18.2276L47.4289 9.28323C47.5224 9.16003 47.6394 9.07553 47.7797 9.02973C47.92 8.98395 48.0604 8.99104 48.2007 9.051C48.341 9.10551 48.4521 9.1971 48.534 9.32575C48.6158 9.45441 48.6451 9.59179 48.6217 9.73788L47.8582 15.6861H51.43C51.6717 15.6861 51.8421 15.7902 51.9412 15.9985C52.0403 16.2067 52.0141 16.4035 51.8627 16.5889L44.908 24.758C44.8144 24.8725 44.6938 24.9469 44.5463 24.9812C44.3987 25.0156 44.262 25.0028 44.1361 24.9428C44.0047 24.8883 43.9031 24.7994 43.8312 24.6762C43.7594 24.553 43.7324 24.4156 43.7502 24.2641L44.5087 19.0878Z' fill='#603CFF' />
                                    </g>
                                    <defs>
                                    <filter id='filter0_d_264_1873' x='0.0499992' y='0.549999' width='92.9' height='97.9' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                                        <feFlood floodOpacity='0' result='BackgroundImageFix' />
                                        <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
                                        <feOffset dy='32.5' />
                                        <feGaussianBlur stdDeviation='20.475' />
                                        <feComposite in2='hardAlpha' operator='out' />
                                        <feColorMatrix type='matrix' values='0 0 0 0 0.262745 0 0 0 0 0.0941176 0 0 0 0 1 0 0 0 0.28 0' />
                                        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_264_1873' />
                                        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_264_1873' result='shape' />
                                    </filter>
                                    </defs>
                                </svg>
                            </div>
                            <p className='text-[#120F43] font-semibold text-sm md:text-base font-plus-jakarta-sans'>Advanced</p>
                        </div>
                    </div>
                    <div className='flex flex-grow flex-col justify-center items-center overflow-auto p-4'>
                        {response ? (
                            <div className='w-full max-w-3xl mx-auto py-8 md:py-12 px-4 md:px-6 rounded-3xl max-h-full'>
                                {/* <div className='flex justify-end w-full mb-4'>
                                    <div className='w-full sm:w-2/3 py-2 px-4 rounded-lg bg-gray-200'>
                                        {}
                                    </div>
                                </div> */}
                                <div className='flex justify-end w-full mb-4'>
                                    <div className='w-full sm:w-2/3 py-2 px-4 rounded-lg bg-gray-200'>
                                        {question}
                                    </div>
                                </div>
                                <div className='mb-4 react-markdown shadow-xl rounded-3xl p-4'>
                                    <ReactMarkdown>{response}</ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div className='w-full max-w-3xl mx-auto py-8 md:py-12 px-4 md:px-6 shadow-xl rounded-3xl max-h-full'>
                                <h1 className='font-playfair text-2xl md:text-5xl text-[#0000009f] text-center mb-8 md:mb-12'>
                                    You're Right on Time.
                                    <br />
                                    Type your first question below to enter the portal. 
                                </h1>
                            </div>
                        )}
                    </div>
                    <div className='w-full max-w-3xl mt-8 mx-auto'>
                        <form className='flex gap-1 md:gap-4' onSubmit={onGenerate}>
                            <div className='flex-grow w-full'>
                                <input
                                    type='text'
                                    className='w-full bg-white px-4 py-3 rounded-full border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-transparent'
                                    placeholder={hasAskedFirstQuestion ? "Ask another question..." : "What's one shift I can make today to raise my frequency?"}
                                    required
                                    value={askText}
                                    onChange={handleAskText}
                                />
                                <div className='w-full h-[1px] bg-[#E9EDF7] mt-2'></div>
                                <p className='hidden md:inline text-xs text-[#718096] font-plus-jakarta-sans mt-2 text-center'>
                                    You're among the first to experience ZenAI — your presence and questions will shape what comes next.
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.6 }}
                                className='w-16 md:w-auto'
                            >
                                <ExplosionEffect className='w-12 md:w-full'>
                                    <button
                                        className='w-12 md:w-full font-plus-jakarta-sans md:w-auto cursor-pointer py-2 md:py-3 px-8 md:px-12 text-white rounded-full quad-gradient text-base md:text-lg flex items-center justify-center'
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                </svg>
                                                <span className="hidden md:inline">Loading...</span>
                                            </span>
                                        ) : (
                                            <>
                                                <span className="hidden md:inline">Submit</span>
                                                <span className='md:hidden'><SendIcon className="h-5 w-5" /></span>
                                            </>
                                        )}
                                    </button>
                                </ExplosionEffect>
                            </motion.div>
                        </form>
                    </div>
                    <div className='flex justify-center md:justify-end p-4'>
                        <ul className='flex flex-wrap justify-center gap-4 text-sm md:text-base'>
                            <li>
                                <a 
                                    href='/'
                                    className='text-[#718096] font-plus-jakarta-sans hover:underline'
                                >
                                    Homepage
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='/terms-condition'
                                    className='text-[#718096] font-plus-jakarta-sans hover:underline'
                                >
                                    Terms of Use
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='/privacy-policy'
                                    className='text-[#718096] font-plus-jakarta-sans hover:underline'
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZenAiChat;