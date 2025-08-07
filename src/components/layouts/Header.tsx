import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';

const Header = () => {
    const navigate = useNavigate();
    const role = useAppSelector((state) => state.user.role);

    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const handleClick = useCallback((link?: string) => () => {
        if (link) {
            navigate(link);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    }, [navigate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='header bg-[#EBDFCC] sticky top-0 py-3 md:py-5 z-[1000]'>
            <nav className='container flex items-center gap-x-4 mx-auto py-4'>
                <div className='logo h-12 min-w-[196px] cursor-pointer' onClick={handleClick('/')}>
                    <img
                        className='h-full w-auto'
                        src='/assets/logo.png'
                        alt='logo'
                    />
                </div>
                <div className='flex flex-grow items-center justify-center'>
                    <div className='hidden lg:flex space-x-[50px]'>
                        <button
                            onClick={handleClick('/')}
                            className='menu-link font-lato'>
                                Home
                        </button>
                        <button
                            onClick={handleClick('/about-zenshift')}
                            className='menu-link font-lato'>
                                About ZenShift
                        </button>
                        <button
                            onClick={handleClick('/portals')}
                            className='menu-link font-lato'>
                                Portals
                        </button>
                        <button
                            onClick={handleClick('/tools')}
                            className='menu-link font-lato'>
                                Free Tools
                        </button>
                        <button
                            onClick={handleClick('/store')}
                            className='menu-link font-lato'>
                                The Shift Store
                        </button>
                        <button
                            onClick={handleClick('/journals')}
                            className='menu-link font-lato'>
                                Journal
                        </button>
                        {role === 'admin' && (
                            <button
                                onClick={handleClick('/admin/dashboard')}
                                className='menu-link font-lato'
                            >
                                Management
                            </button>
                        )}
                    </div>
                </div>
                <div className='lg:hidden flex items-center justify-end'>
                    <div className='lg:hidden'>
                        <button 
                            className='text-gray-800 focus:outline-none'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <img src="../../assets/favicon_32x32.png" alt="menu" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#F9EEDD] shadow-lg transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`} ref={dropdownRef}>
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                    <button
                        onClick={handleClick('/')}
                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                    >
                        Home
                    </button>
                    <button
                        onClick={handleClick('/about-zenshift')}
                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                    >
                        About ZenShift
                    </button>
                    <button
                        onClick={handleClick('/portals')}
                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                    >
                        Portals
                    </button>
                    <button
                        onClick={handleClick('/tools')}
                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                    >
                        Free Tools
                    </button>
                    <button
                        onClick={handleClick('/store')}
                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                    >
                        The Shift Store
                    </button>
                    <button
                        onClick={handleClick('/journals')}
                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                    >
                        Journal
                    </button>
                    {role === 'admin' && (
                        <button
                            onClick={handleClick('/admin/dashboard')}
                            className='block w-full text-left px-3 py-2 rounded-md text-base font-medium font-lato text-gray-800 hover:text-[#ffe64d]'
                        >
                            Management
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;