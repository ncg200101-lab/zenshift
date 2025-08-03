import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '../ui/ChatBot';

const Layout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex flex-1 flex-col'>
                <Outlet />
            </main>
            <Footer />
            <ChatBot />
        </div>
    );
};

export default Layout;