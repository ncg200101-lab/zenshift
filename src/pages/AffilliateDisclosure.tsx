import { motion } from 'framer-motion';
import { MainTitle, SubTitle, Text, Typography } from '../components/ui/Text';

interface SubMenuListProps {
    items: string[];
}

interface InfoSectionProps {
    points: string[];
}

const ArrowIcon = () => (
    <svg 
        className='w-[18px] md:w-[30px] h-[24px] md:h-[40px]' 
        viewBox='0 0 63 74' 
        fill='none' 
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
    >
        <path d='M63 37L0 73.3731V0.626934L63 37Z' fill='#362925' fillOpacity='0.63' />
    </svg>
);

const SubMenuList = ({ items }: SubMenuListProps) => (
    <ul className='ml-20 md:ml-24 list-disc text-left'>
        {items.map((item: string) => (
            <li key={item} className='text-[#362925] text-lg md:text-2xl mb-2'>{item}</li>
        ))}
    </ul>
);

const InfoSection = ({ points }: InfoSectionProps) => (
    <div className='text-start px-2 md:px-6'>
        <ul className='list-none space-y-4'>
            {points.map((point: string) => (
                <li key={point} className='flex text-[#362925] text-xl md:text-3xl leading-relaxed'>
                    <span className='mr-5 mt-1 md:mt-2 text-[#362925] font-bold'>
                        <ArrowIcon />
                    </span>
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

const AffiliateDisclosure = () => {
    const whyThisMattersPoints = [
        'We only recommend what we use, love, or fully believe in.',
        'No algorithms. No mass deals. No empty plugs.',
        'These commissions help us keep ZenShift flowing: from energetically curated content to the tools, templates, and digital spaces we freely offer to support your shift.'
    ];

    const howItWorksPoints = [
        'Many of the products in the Shift Store and Apothecary link to trusted affiliate partners.',
        'If you choose to purchase through one of those links, we may receive a commission.',
        'That support helps us continue to create free, expansive tools without putting transformation behind a paywall.'
    ];

    const curationPoints = [
        'We don\'t list things because they sell',
        'We list them because they support the shift.',
        'Every tool, supplement, and product you\'ll find here has been reviewed for:'
    ];

    const trustPoints = [
        'You are under no obligation to purchase through our links.',
        'You will never see a product here that hasn\'t passed our energetic standards.',
        'Transparency is part of our resonance field. You deserve to know when a partnership is involved—and we\'re always available if you have questions.'
    ];

    return (
        <>
            <div className='absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-[60px] md:top-[80px] left-0 -z-[1] -translate-x-[50%] animate-opacity'>
                <img src='/assets/loader-images/blue-chakra.png' alt='' />
            </div>
            <div className='absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] top-[100px] right-0 -z-[1] translate-x-[50%] -translate-y-[50%] animate-opacity'>
                <img src='/assets/loader-images/light-blue-chakra.png' alt='' />
            </div> 
            <div className='container pt-12 md:pt-24 pb-12 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-8 md:mb-16'
                >
                    <MainTitle>
                        Affiliate Disclosure
                    </MainTitle>
                </motion.div>
                <Typography className='mb-6'>
                    Everything we share here is offered in resonance.
                </Typography>
                <Text>
                    By choosing to engage with ZenShift, you enter into a conscious agreement—one built on clarity, trust, and respect. These terms are here not to restrict your journey, but to help hold the container as you shift into new space.
                </Text>
            </div>
            <div className='container py-6 md:py-12 text-center space-y-6 md:space-y-12'>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='mb-6 md:mb-12'>
                        Why This Matters
                    </SubTitle>
                    <InfoSection points={whyThisMattersPoints} />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='mb-6 md:mb-12'>
                        How It Works
                    </SubTitle>
                    <InfoSection points={howItWorksPoints} />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='mb-6 md:mb-12'>
                        Our Curation Philosophy:
                    </SubTitle>
                    <InfoSection points={curationPoints} />
                    <SubMenuList items={[
                        'Energetic alignment',
                        'Ingredient integrity',
                        'Brand intention',
                        'Long-term benefit to our collective evolution'
                    ]} />
                    <InfoSection points={['We only say yes when we feel the yes in our body.']} />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <SubTitle className='mb-6 md:mb-12'>
                        Your Trust Is Sacred
                    </SubTitle>
                    <InfoSection points={trustPoints} />
                </motion.div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='container pb-6 md:pb-12 text-center'
            >
                <SubTitle className='mb-6 md:mb-12'>
                    Questions or Concerns?
                </SubTitle>
                <p className='text-2xl md:text-4xl font-bold font-playfair text-[#362925] mb-6'>
                    Email:&nbsp;
                    <a href='mailto:hello@zenshift.com' className='underline text-2xl md:text-4xl font-bold font-playfair text-[#362925]'>
                        hello@zenshift.com
                    </a>
                </p>
                <Text>
                    if you'd like more information about a specific link or partner.
                </Text>
            </motion.div>
        </>
    );
}

export default AffiliateDisclosure;