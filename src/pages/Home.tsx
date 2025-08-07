import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TransparentButton, FilledButton } from '../components/ui/Buttons';
import { MainTitle, SubTitle, Text, Typography } from '../components/ui/Text';
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
        text: 'Wealth is Frequency Tap In',
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
        title: 'ZenShift Travel',
        image: '/assets/categories/zen_coming_travels.jpg'
    },
    {
        title: 'ZenShift Academy',
        image: '/assets/categories/zen_coming_academy.jpg'
    },
    {
        title: 'ZenShift Collective',
        image: '/assets/categories/zen_coming_collective.jpg'
    },
    {
        title: 'ZenShift Golf',
        image: '/assets/categories/zen_coming_golf.jpg'
    },
];

const Home = () => {
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
            <div className='pt-12 md:pt-24 pb-12 text-center home-background'>
                <div className='container'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='mb-8 md:mb-16'
                    >
                        <MainTitle>
                            <span className='title-segeo text-black'>you're right on time</span><br />
                            ZenShift
                        </MainTitle>
                    </motion.div>
                    <div className='chakra-row'>
                        <div className='chakra-circle red'></div>
                        <div className='chakra-circle orange'></div>
                        <div className='chakra-circle yellow'></div>
                        <div className='chakra-circle green'></div>
                        <div className='chakra-circle blue'></div>
                        <div className='chakra-circle indigo'></div>
                        <div className='chakra-circle purple'></div>
                    </div>
                    <Text className='mb-12'>
                        Your portal into the shift from 3D to 5D, where living energy meets intelligent design to guide your next evolution. Step into the next generation of conscious living as ZenShift fuses multidimensional awareness, spiritual embodiment tools, and intelligent automation to help you align, evolve, and live at your highest frequency.
                    </Text>
                    <div className='flex flex-wrap justify-center gap-6 md:gap-20'>
                        <TransparentButton onClick={handleClick('/store')} hidden>
                            Enter The Shift
                        </TransparentButton>
                        <FilledButton onClick={handleClick('/zen-ai')}>
                            Meet the Mirror
                        </FilledButton>
                    </div>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-6 md:py-12'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center'>
                    <div className='flex gap-4 md:gap-10 justify-center'>
                        <img className='sparkle-image' src='/assets/sparkle.png' alt='sparkle' />
                        <div className='max-w-xl mt-6 md:mt-12'>
                            <h2 className='title text-[30px] md:text-[45px]'>What is ZenShift?</h2>
                            <p className='text text-[20px] md:text-[25px]'>
                                ZenShift is a next-generation lifestyle brand that fuses multidimensional awareness, spiritual embodiment tools, and intelligent automation to support the evolution of conscious living.
                            </p>
                        </div>
                    </div>
                    <div className='w-0 h-[320px] sm:h-[370px] min-w-[320px] sm:min-w-[370px] flex intersect items-center justify-center rounded-[50px] overflow-hidden'>
                        <div className='chakra-col flex flex-col items-center justify-center z-[10]'>
                            <div className='chakra-small-circle purple'></div>
                            <div className='chakra-small-circle indigo'></div>
                            <div className='chakra-small-circle blue'></div>
                            <div className='chakra-small-circle green'></div>
                            <div className='chakra-small-circle yellow'></div>
                            <div className='chakra-small-circle orange'></div>
                            <div className='chakra-small-circle red'></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container py-12 md:py-24 text-center'>
                <div className='mb-12 md:mb-24'>
                    <SubTitle className='mb-12 md:mb-24'>
                        Explore The Shift
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
                                            LEARN MORE <span className='text-lg'>→</span>
                                        </button>
                                    </div>
                                </ExplosionEffect>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div>
                    <SubTitle className='mb-12 md:mb-24 underline'>
                        What is Coming?
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
                        The ZenShift Ascension Phases
                    </SubTitle>
                    <Typography className='mb-6 font-medium'>
                        Our journey unfolds through 8 energetic shifts, each one a step toward coherence, clarity, and embodied living:
                    </Typography>
                    <Typography className='mb-6 font-medium'>
                        Awakening • Pauses • Thresholds • Quiet Seasons • Downloads • Integration • Expansion • Embodiment
                    </Typography>
                </motion.div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='mb-12'>
                        Experience The Shift
                    </SubTitle>
                    <Typography className='mb-6 text-left font-medium'>
                        <span>ZenAI</span> is your personal multidimensional assistant, built on the ZenShift frequencies and guided by the 8 Ascension Phases. Ask questions, explore teachings, or receive support anytime. Wherever you are on the site, the spinning ZenAI orb is your gateway, click to enter and receive.
                    </Typography>
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

export default Home;