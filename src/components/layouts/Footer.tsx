import { useState, useCallback } from 'react';
import ExplosionEffect from '../ui/ExplosionEffect';
import FrequencyModal from '../ui/FrequencyModal';

const Footer = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <footer
                className='relative bg-[#a79c8b] py-10 sm:py-16 lg:py-20 text-white'
            >
                <div
                    className='absolute flex justify-center bottom-[100%] translate-y-[40%] lg:bottom-0 lg:translate-y-0 left-0 right-0 -z-[1] animate-opacity'
                >
                    <img
                        className='w-full lg:w-[80%]'
                        src='/assets/chakra-bottom.svg'
                        alt='Chakra bottom decoration'
                    />
                </div>
                <div
                    className='container mx-auto text-center text-[#ECE9E9] text-lg md:text-xl mb-6 md:mb-12'
                >
                    <span className='text-[#ff5b5b]'>Disclaimer</span>:
                    {' '}
                    All tools, products, and content provided by ZenShift are for educational and energetic support only. They do not constitute medical, financial, or legal advice. Always tune to your own guidance.
                </div>
                <div className='container mx-auto flex flex-wrap justify-between gap-8'>
                    <div className='w-full md:w-[45%] lg:w-1/4'>
                        <div className='flex space-x-1 mb-8'>
                            <span className='chakra-dot-sm red'></span>
                            <span className='chakra-dot-sm orange'></span>
                            <span className='chakra-dot-sm yellow'></span>
                            <span className='chakra-dot-sm green'></span>
                            <span className='chakra-dot-sm blue'></span>
                            <span className='chakra-dot-sm indigo'></span>
                            <span className='chakra-dot-sm purple'></span>
                        </div>
                        <p className='text-base sm:text-lg font-raleway'>
                            Receive sacred access to ZenShift drops, frequency tools, and light-encoded launches.
                        </p>
                        <p className='text-base sm:text-lg mb-6 md:mb-12 font-raleway'>
                            Early access. No fluff. Just resonance.
                        </p>
                        <ExplosionEffect className='w-full'>
                            <button
                                className='
                                    w-full
                                    bg-gradient-to-b from-[#7a651a] to-[#C2B36B]
                                    text-white
                                    text-sm sm:text-base lg:text-[20px]
                                    py-2 sm:py-3 lg:py-4
                                    rounded-[25px]
                                    font-bold
                                    font-raleway
                                    transition-all duration-150
                                    shadow-[0_6px_0_0_#7a651a,0_8px_15px_0_rgba(0,0,0,0.2)]
                                    border-b-4 border-[#7a651a]
                                    hover:scale-105
                                    hover:shadow-[0_2px_0_0_#7a651a,0_4px_8px_0_rgba(0,0,0,0.2)]
                                    active:translate-y-1
                                    active:shadow-[0_1px_0_0_#7a651a,0_2px_4px_0_rgba(0,0,0,0.2)]
                                '
                                onClick={handleClickOpen}
                            >
                                Join the Frequency List
                            </button>
                        </ExplosionEffect>
                    </div>

                    <div className='w-full sm:w-[45%] md:w-[45%] lg:w-1/6'>
                        <h4 className='font-bold text-base sm:text-lg mb-4 font-raleway'>
                            Page
                        </h4>
                        <ul className='space-y-4'>
                            <li>
                                <a
                                    href='/about-zenshift'
                                    className='hover:underline font-raleway text-sm sm:text-base'
                                >
                                    About Zenshift
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/portals'
                                    className='hover:underline font-raleway text-sm sm:text-base'
                                >
                                    Portals
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/store'
                                    className='hover:underline font-raleway text-sm sm:text-base'
                                >
                                    The Shift Store
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/journal'
                                    className='hover:underline font-raleway text-sm sm:text-base'
                                >
                                    Journals
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='w-full sm:w-[45%] md:w-[45%] lg:w-1/4'>
                        <h4 className='font-bold text-base sm:text-lg mb-4 font-raleway'>
                            Contact Us
                        </h4>
                        <div className='space-y-4'>
                            <div className='font-raleway text-sm sm:text-base'>
                                <a
                                    href='mailto:hello@zenshift.com'
                                    className='flex items-center'
                                >
                                    <span className='mr-2 flex-shrink-0'>
                                        <svg
                                            className='w-[18px] h-[18px]'
                                            viewBox='0 0 30 27'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M21.7119 0.666992C26.1519 0.666992 29.4999 4.28966 29.4999 9.09366V18.251C29.4999 20.7097 28.6306 22.931 27.0506 24.507C25.6333 25.919 23.7946 26.667 21.7333 26.667H8.59592C6.53859 26.667 4.70125 25.9203 3.28259 24.507C1.70259 22.931 0.833252 20.7097 0.833252 18.251V9.09366C0.833252 4.28966 4.18125 0.666992 8.62125 0.666992H21.7119ZM21.7119 2.66699H8.62125C5.26792 2.66699 2.83325 5.36966 2.83325 9.09366V18.251C2.83325 20.175 3.49459 21.8937 4.69458 23.0897C5.72925 24.123 7.07992 24.667 8.59992 24.667H21.7119C21.7146 24.6643 21.7253 24.667 21.7333 24.667C23.2546 24.667 24.6039 24.123 25.6386 23.0897C26.8399 21.8937 27.4999 20.175 27.4999 18.251V9.09366C27.4999 5.36966 25.0653 2.66699 21.7119 2.66699ZM23.8132 8.83873C24.1612 9.26673 24.0959 9.89606 23.6679 10.2454L17.7426 15.0614C16.9933 15.6561 16.0973 15.9534 15.2026 15.9534C14.3106 15.9534 13.4213 15.6587 12.6773 15.0694L6.69725 10.2481C6.26659 9.90139 6.19992 9.27073 6.54525 8.84139C6.89325 8.41339 7.52259 8.34539 7.95192 8.69073L13.9266 13.5067C14.6773 14.1014 15.7346 14.1014 16.4906 13.5014L22.4052 8.69339C22.8346 8.34273 23.4639 8.40939 23.8132 8.83873Z'
                                                fill='white'
                                            />
                                        </svg>
                                    </span>
                                    <span>hello@zenshift.com</span>
                                </a>
                            </div>
                        </div>
                        <div className='flex items-center space-x-4 mt-6'>
                            <a
                                href='https://www.instagram.com/zenshiftofficial/'
                                target='_blank'
                                rel='noreferrer'
                                className='hover:opacity-75 transition-opacity'
                            >
                                <svg
                                    width='23'
                                    height='22'
                                    viewBox='0 0 23 22'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M11.497 7.32835C9.47547 7.32835 7.82571 8.97814 7.82571 10.9998C7.82571 13.0214 9.47547 14.6712 11.497 14.6712C13.5186 14.6712 15.1684 13.0214 15.1684 10.9998C15.1684 8.97814 13.5186 7.32835 11.497 7.32835ZM22.5083 10.9998C22.5083 9.47942 22.5221 7.97285 22.4367 6.45526C22.3513 4.69254 21.9492 3.12813 20.6602 1.83915C19.3685 0.54741 17.8069 0.148045 16.0442 0.0626639C14.5239 -0.0227176 13.0174 -0.00894639 11.4998 -0.00894639C9.97948 -0.00894639 8.47294 -0.0227176 6.95538 0.0626639C5.1927 0.148045 3.62832 0.550165 2.33936 1.83915C1.04764 3.13089 0.648287 4.69254 0.562907 6.45526C0.477527 7.9756 0.491298 9.48217 0.491298 10.9998C0.491298 12.5173 0.477527 14.0267 0.562907 15.5443C0.648287 17.307 1.0504 18.8714 2.33936 20.1604C3.63107 21.4521 5.1927 21.8515 6.95538 21.9369C8.4757 22.0222 9.98224 22.0085 11.4998 22.0085C13.0201 22.0085 14.5267 22.0222 16.0442 21.9369C17.8069 21.8515 19.3713 21.4494 20.6602 20.1604C21.952 18.8686 22.3513 17.307 22.4367 15.5443C22.5248 14.0267 22.5083 12.5201 22.5083 10.9998ZM11.497 16.6487C8.37104 16.6487 5.8482 14.1258 5.8482 10.9998C5.8482 7.87369 8.37104 5.35081 11.497 5.35081C14.623 5.35081 17.1459 7.87369 17.1459 10.9998C17.1459 14.1258 14.623 16.6487 11.497 16.6487ZM17.3772 6.43873C16.6474 6.43873 16.058 5.84933 16.058 5.11945C16.058 4.38958 16.6474 3.80017 17.3772 3.80017C18.1071 3.80017 18.6965 4.38958 18.6965 5.11945C18.6967 5.29276 18.6627 5.46442 18.5965 5.62458C18.5303 5.78474 18.4331 5.93026 18.3106 6.05281C18.188 6.17536 18.0425 6.27253 17.8824 6.33875C17.7222 6.40498 17.5505 6.43895 17.3772 6.43873Z' fill='white' />
                                </svg>
                            </a>
                            <a
                                href='https://www.facebook.com/ZenshiftOfficial'
                                target='_blank'
                                rel='noreferrer'
                                className='hover:opacity-75 transition-opacity'
                            >
                                <svg
                                    width='25'
                                    height='24'
                                    viewBox='0 0 25 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M0.5 12.067C0.5 18.033 4.833 22.994 10.5 24V15.333H7.5V12H10.5V9.333C10.5 6.333 12.433 4.667 15.167 4.667C16.033 4.667 16.967 4.8 17.833 4.933V8H16.3C14.833 8 14.5 8.733 14.5 9.667V12H17.7L17.167 15.333H14.5V24C20.167 22.994 24.5 18.034 24.5 12.067C24.5 5.43 19.1 0 12.5 0C5.9 0 0.5 5.43 0.5 12.067Z'
                                        fill='white'
                                    />
                                </svg>
                            </a>
                            <a
                                href='https://www.pinterest.com/zenshiftofficial/'
                                target='_blank'
                                rel='noreferrer'
                                className='hover:opacity-75 transition-opacity'
                            >
                                <svg
                                    width='28'
                                    height='28'
                                    viewBox='0 0 28 28'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M13.9079 0.364258C10.7463 0.385142 7.69018 1.50408 5.26251 3.52961C2.83485 5.55514 1.18652 8.36135 0.599586 11.4681C0.0126477 14.5748 0.523577 17.789 2.04495 20.5606C3.56632 23.3322 6.00358 25.4889 8.93967 26.6618C8.74232 25.3707 8.74232 24.0571 8.93967 22.766L10.5476 15.9476C10.2935 15.33 10.1668 14.6674 10.175 13.9997C10.175 12.1098 11.2758 10.6875 12.64 10.6875C12.887 10.6838 13.132 10.7335 13.358 10.8332C13.584 10.9329 13.7858 11.0804 13.9496 11.2654C14.1133 11.4504 14.2351 11.6686 14.3067 11.9051C14.3782 12.1415 14.3978 12.3907 14.3641 12.6354C14.3641 13.3891 14.0553 14.3864 13.7323 15.4319C13.5552 16.0085 13.3724 16.6007 13.2336 17.1744C13.1496 17.476 13.1395 17.7934 13.2041 18.0997C13.2688 18.406 13.4064 18.6922 13.6051 18.934C13.8039 19.1759 14.058 19.3663 14.346 19.4891C14.634 19.6119 14.9473 19.6634 15.2594 19.6394C17.6748 19.6394 19.5448 17.0767 19.5448 13.3962C19.5687 12.6481 19.4365 11.9033 19.1567 11.2092C18.8768 10.5151 18.4555 9.88685 17.9194 9.36454C17.3834 8.84224 16.7445 8.43732 16.0433 8.17557C15.3422 7.91382 14.5942 7.80099 13.847 7.84426C13.0492 7.80994 12.2528 7.93787 11.5059 8.22031C10.759 8.50276 10.0771 8.93383 9.50168 9.48744C8.92622 10.041 8.46908 10.7057 8.15795 11.4411C7.84682 12.1765 7.68817 12.9674 7.69159 13.7659C7.68136 14.8783 8.02245 15.9655 8.66625 16.8727C8.71316 16.9247 8.74649 16.9874 8.7633 17.0554C8.78011 17.1233 8.77986 17.1944 8.76259 17.2623C8.65634 17.6915 8.42259 18.6265 8.38292 18.8107C8.34467 18.9948 8.17892 19.1124 7.92534 18.9948C6.22109 18.1973 5.16 15.7138 5.16 13.7078C5.16 9.41251 8.28659 5.45859 14.17 5.45859C18.8918 5.45859 22.5737 8.82742 22.5737 13.3381C22.5737 18.0315 19.6525 21.8098 15.4932 21.8098C14.8836 21.8304 14.2784 21.6987 13.7325 21.4266C13.1866 21.1545 12.7171 20.7506 12.3666 20.2514L11.5194 23.4956C11.1132 24.7559 10.5436 25.9575 9.82509 27.0698C11.149 27.4622 12.5244 27.6527 13.9051 27.6351C17.5214 27.6351 20.9896 26.1985 23.5468 23.6414C26.1039 21.0842 27.5405 17.616 27.5405 13.9997C27.5405 10.3833 26.1039 6.91511 23.5468 4.35798C20.9896 1.80084 17.5214 0.364258 13.9051 0.364258' fill='white'/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className='w-full sm:w-[45%] md:w-[45%] lg:w-1/6'>
                        <h4 className='font-bold text-base sm:text-lg mb-4 font-raleway'>
                            Links
                        </h4>
                        <ul className='space-y-4'>
                            <li>
                                <a
                                    href='/terms-condition'
                                    className='hover:underline font-raleway text-sm sm:text-base'
                                >
                                    Term Of Use
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/privacy-policy'
                                    className='hover:underline font-raleway text-sm sm:text-base'
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            <FrequencyModal open={open} onClose={handleClose} />
        </>
    );
};

export default Footer;