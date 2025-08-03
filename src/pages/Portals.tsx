import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LargeFilledButton, FilledButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text } from '../components/ui/Text';          
import ExplosionEffect from '../components/ui/ExplosionEffect';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface ZenshiftCategoryProps {
    title?: string;
    text?: string;
    image: string;
    link?: string;
}

const activeZenshiftCategoryLists: ZenshiftCategoryProps[] = [
    {
        title: 'ZenShift Abundance',
        text: 'Wealth is Frequency TapIn',
        image: '/assets/categories/zen_abundance.jpg',
        link: '/abundance'
    },
    {
        title: 'ZenShift Apothecary',
        text: 'Plant tools, Frequency codes, Affiliate-powered',
        image: '/assets/categories/zen_aprothecary.jpg',
        link: '/apothecary'
    },
    {
        title: 'ZenShift Interior',
        text: 'Shift Your Surroundings Shift Your Life',
        image: '/assets/categories/zen_interior.jpg',
        link: '/interiors'
    },
    {
        title: 'ZenShift Health',
        text: 'Your Body is an energy field Treat it like one',
        image: '/assets/categories/zen_health.jpg',
        link: '/health'
    },
];

const comingZenshiftCategoryLists: ZenshiftCategoryProps[] = [
    {
        title: 'ZenShift Kids',
        image: '/assets/categories/zen_coming_kids.jpg'
    },
    {
        title: 'ZenShift Masters',
        image: '/assets/categories/zen_coming_masters.jpg'
    },
    {
        title: 'ZenShift Travels',
        image: '/assets/categories/zen_coming_travels.jpg'
    },
    {
        title: 'ZenShift Academy',
        image: '/assets/categories/zen_coming_academy.jpg'
    },
    {
        title: 'ZenShift Collectives',
        image: '/assets/categories/zen_coming_collective.jpg'
    },
    {
        title: 'ZenShift Golf',
        image: '/assets/categories/zen_coming_golf.jpg'
    },
];

const ExploreVerticals = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);

    const handleClick = useCallback((link?: string) => () => {
        if (link) {
            navigate(link);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [navigate]);

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
                        Where do you feel the<br/><span>Shift?</span>
                    </MainTitle>
                </motion.div>
                <Text className='mb-4 md:mb-8'>
                    Each vertical holds a different frequency. Explore what calls to you, and enter where your energy feels most alive.
                </Text>
                <div className='flex justify-center gap-10 md:gap-20'>
                    <FilledButton>
                        Enter the Grid
                    </FilledButton>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            
            <div className='container py-8 md:py-18 text-center'>
                <div className='mb-12 md:mb-24'>
                    <SubTitle className='mb-12 md:mb-24'>
                        Active Verticals
                    </SubTitle>
                    <div className='zen-card-grid grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center'>
                        {activeZenshiftCategoryLists.map((item: ZenshiftCategoryProps, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.6 }}
                                className='rounded-xl overflow-hidden shadow-lg flex flex-col w-full max-w-[420px] hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] cursor-pointer'
                                onClick={handleClick(item.link)}
                            >
                                <ExplosionEffect className='h-full flex flex-col' dotQuantity={60} explosionRadius={500} speed={0.8}>
                                    <div className='relative flex flex-col items-start min-h-[180px]'>
                                        <img src={item.image} alt='ZenShift Interior' className='w-full h-full' />
                                    </div>
                                    <div className='bg-[#2d2320] p-6 flex flex-col flex-grow items-center'>
                                        <div className='flex-grow'>
                                            <div className='font-playfair text-white zen-card-title py-4 tracking-widest'>{item.title}</div>
                                            <div className='font-lato text-[#d6d1c4] text-[20px] mb-4 text-center leading-5'>
                                                {item.text}
                                            </div>
                                        </div>
                                        <button
                                            className='learn-more-button rounded-lg border-2 border-white text-white px-6 py-2 flex items-center gap-2 font-lato font-semibold'
                                        >
                                            ENTER <span className='text-lg'>→</span>
                                        </button>
                                    </div>
                                </ExplosionEffect>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div>
                    <SubTitle className='mb-12 md:mb-24'>
                        Coming Falls {new Date().getFullYear()}
                    </SubTitle>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center'>
                        {comingZenshiftCategoryLists.map((item: ZenshiftCategoryProps, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 0.7, y: 0 }}
                                whileHover={{ scale: 1.00 }}
                                transition={{ duration: 0.6 }}
                                className='rounded-xl overflow-hidden shadow-lg flex flex-col w-full max-w-[420px] hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] bg-[#fff]'
                                onClick={() => setOpen(true)}
                            >
                                <ExplosionEffect dotQuantity={60} explosionRadius={500} speed={0.8}>
                                    <div className='rounded-xl overflow-hidden bg-[#f9eedd] flex flex-col w-full shadow-lg'>
                                        <div className='relative'>
                                            <img src={item.image} alt={item.title} className='w-full h-full' />
                                        </div>
                                        <div className='bg-[#2d2320] p-6 flex flex-col items-center'>
                                            <div className='zen-coming-card-title font-playfair text-white text-2xl font-bold text-center tracking-widest max-w-[300px]'>
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                </ExplosionEffect>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='mb-12'>
                        Not Sure? Where To Start?
                    </SubTitle>
                    <div className='flex justify-center'>
                        <LargeFilledButton onClick={handleClick('/zen-ai')}>
                            Ask ZenAI
                        </LargeFilledButton>
                    </div>
                </motion.div>
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This portal is still tuning in. Stay close.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ExploreVerticals;