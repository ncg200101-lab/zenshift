import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FilledButton } from '../components/ui/Buttons';
import ValueBox from '../components/ui/ValueBox';
import { MainTitle, SubTitle, Typography, Text } from '../components/ui/Text';

interface ListInterface {
    title: string;
    description: string;
}

const lists: ListInterface[] = [
    {
        title: 'Alignment',
        description: 'We don\'t force. We feel. We follow the energetic yes.',
    },
    {       
        title: 'Embodiment',
        description: 'Spirituality isn\'t a concept. It\'s a frequency lived through your body.',
    },
    {
        title: 'Intelligence',
        description: 'We blend ancient codes with AI and systems — because wisdom evolves.',
    },
    {
        title: 'Sovereignty',
        description: 'You already know. We help you remember.',
    },
    {
        title: 'Trust',
        description: 'We trust the shift. We trust you.',
    },
];

const About = () => {
    const visionRef = useRef<HTMLDivElement>(null);

    const scrollToVision = () => {
        visionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

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
                    <MainTitle className='w-full max-w-4xl mx-auto'>
                        You've Felt it Something is <span>Shifting</span>
                    </MainTitle>
                </motion.div>
                <Text className='max-w-4xl mx-auto mb-8 md:mb-16'>
                    ZenShift was built for the ones waking up to more. More depth. More truth.More life. A new way of living is arriving and you've been feeling it all along.
                </Text>
                <div className='flex justify-center gap-10 md:gap-20'>
                    <FilledButton onClick={scrollToVision}>
                        Explore the Visions
                    </FilledButton>
                </div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='text-center mb-12 md:mb-24'>
                        The Origin Story
                    </SubTitle>
                    <div className='flex justify-center items-center mt-10 mb-10'>
                        <div className='flex justify-end w-full md:w-2/3 px-5'>
                            <Text className='max-w-2xl'>
                                ZenShift wasn't created. It was remembered. It came through during a personal awakening, built on moments of synchronicity, collapse, and clarity. It lives at the intersection of energy and intelligence, of ancient knowing and modern tools. It's for those who feel like this world never quite fit — and are now ready to build the one that does. 
                            </Text>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className='hidden md:block w-1/3 px-5 flex justify-center items-center'
                        >
                            <div className='w-64 h-64 rounded-3xl overflow-hidden relative spiral-container'>
                                <img 
                                    src='/assets/spiral.png' 
                                    alt='spiral' 
                                    className='md:w-[100%] md:h-[100%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div> 
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    ref={visionRef}
                >
                    <SubTitle className='text-center mb-6 md:mb-12'>
                        Our Vision
                    </SubTitle>
                    <Typography className='text-center mb-6 md:mb-12'>
                        To align every space, choice, and shift with soul.
                    </Typography>
                    <Text>
                        ZenShift is a next-generation lifestyle brand guiding people from 3D to 5D living. Our mission is to reconnect you to your own energetic truth, and equip you with tools - digital, spatial, emotional, spiritual - that help you live in harmony with the frequency you came here to embody.
                    </Text>
                </motion.div>
            </div>
            <div className='w-full h-[3px] bg-[#00f1ff]'></div>
            <div className='container py-12 md:py-24'>
                <SubTitle className='text-center mb-12 md:mb-24'>
                    What We Value
                </SubTitle>
                <div className='flex flex-wrap justify-center max-w-[960px] mx-auto gap-8 md:gap-16'>
                    {lists.map((item: ListInterface, index: number) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.04 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className='cursor-pointer'
                        >
                            <ValueBox title={item.title} description={item.description} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default About;