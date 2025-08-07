import { useEffect } from 'react';
import {
    Routes,
    Route,
    useLocation
} from 'react-router-dom';
import { useAppDispatch } from './state/hooks';
import Layout from './components/layouts/Layout';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Home from './pages/Home';
import About from './pages/AboutZenshift';
import Abundance from './pages/Abundance';
import AffiliateDisclosure from './pages/AffilliateDisclosure';
import Apothecary from './pages/Apothecary';
import JournalPost from './pages/JournalPost';
import BlogPost from './pages/BlogPost';
import Checkout from './pages/Checkout';
import PostPurchaseConfirmation from './pages/Confirmation';
import ContactUs from './pages/ContactUs';
import DashboardPage from './pages/Dashboard';
import Health from './pages/Health';
import ShiftInteriors from './pages/Interiors';
import JournalBlog from './pages/Journal';
import Membership from './pages/Membership';
import ExploreVerticals from './pages/Portals';
import ProductDetailPage from './pages/Product';
import ProductLanding from './pages/ProductLanding';
import TermsAndCondition from './pages/TermsCondition';
import Thanks from './pages/Thanks';
import FreebieLib from './pages/Tools';
import FreebieLibrary from './pages/FreebieLibrary';
import ZenAiChat from './pages/ZenAi';
import MeetZenAI from './pages/MeetZenai';
import ShiftStore from './pages/ShiftStore';
import StoreProducts from './pages/StoreProducts';
import TestPage from './pages/TestPage';
import PrintifyProductDetail from './pages/PrintifyProductDetail';
import PrintifyCheckout from './pages/PrintifyCheckout';
import PrintifyThanks from './pages/PrintifyThanks';
import NotFound from './pages/NotFound';
import SocialCallback from './pages/Auth/SocialCallback';
import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
// import ComingSoon from './pages/ComingSoon';
import VerifyEmail from './pages/Auth/VerifyEmail';
import ResetPassword from './pages/Auth/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';

import UserManagement from './pages/Admin/UserManagement';
import ProductManagement from './pages/Admin/ProductManagement';
import OrderManagement from './pages/Admin/OrderManagement';
import JournalManagement from './pages/Admin/JournalManagement';
import AdminDashboard from './pages/Admin/Dashboard';
import Profile from './pages/Admin/Profile';
import Settings from './pages/Admin/Settings';
import Tables from './pages/Admin/Tables';
import PrintifyManagement from './pages/Admin/PrintifyManagement';
import { isTokenExpired } from './utils/isTokenExpired';
import { logoutAction } from './state/auth/actions';

const App = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            dispatch(logoutAction());
        }
    }, [token, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path='sign-up' element={<SignUp />} />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='forgot-password' element={<ForgotPassword />} />
                    <Route path='verify-email' element={<VerifyEmail />} />
                    <Route path='reset-password' element={<ResetPassword />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path='dashboard' element={<DashboardPage />} />
                    <Route path='confirmation' element={<PostPurchaseConfirmation />} />
                    <Route path='membership' element={<Membership />} />
                    <Route path='zen-ai' element={<ZenAiChat />} />
                </Route>

                <Route path='/social-callback' element={<SocialCallback />} />

                <Route element={<AdminRoute />}>
                    <Route path='/admin/user-management' element={<UserManagement />} />
                    <Route path='/admin/product-management' element={<ProductManagement />} />
                    <Route path='/admin/printify-management' element={<PrintifyManagement />} />
                    <Route path='/admin/order-management' element={<OrderManagement />} />
                    <Route path='/admin/journal-management' element={<JournalManagement />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/profile" element={<Profile />} />
                    <Route path="/admin/tables" element={<Tables />} />
                    <Route path="/admin/settings" element={<Settings />} />
                </Route>

                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='about-zenshift' element={<About />} />
                    <Route path='abundance' element={<Abundance />} />
                    <Route path='affilliate-disclosure' element={<AffiliateDisclosure />} />
                    <Route path='apothecary' element={<Apothecary />} />
                    <Route path='checkout/:id' element={<Checkout />} />
                    <Route path='contact-us' element={<ContactUs />} />
                    <Route path='health' element={<Health />} />
                    <Route path='interiors' element={<ShiftInteriors />} />
                    <Route path='journals' element={<JournalBlog />} />
                    <Route path='journal/:id' element={<JournalPost />} />
                    <Route path='blog/:id' element={<BlogPost />} />
                    <Route path='portals' element={<ExploreVerticals />} />
                    <Route path='product-landing' element={<ProductLanding />} />
                    <Route path='product/:id' element={<ProductDetailPage />} />
                    <Route path='terms-condition' element={<TermsAndCondition />} />
                    <Route path='privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='thanks/:id' element={<Thanks />} />
                    <Route path='tools' element={<FreebieLib />} />
                    <Route path='freebie-library' element={<FreebieLibrary />} />
                    <Route path='meet-zenai' element={<MeetZenAI />} />
                    <Route path='store' element={<ShiftStore />} />
                    <Route path='store/:id' element={<StoreProducts />} />
                    <Route path='test' element={<TestPage />} />
                    <Route path='printify' element={<TestPage />} />
                    <Route path='printify-product/:id' element={<PrintifyProductDetail />} />
                    <Route path='checkout/printify/:id' element={<PrintifyCheckout />} />
                    <Route path='thanks/printify/:id' element={<PrintifyThanks />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
                
                {/* <Route path='*' element={<ComingSoon />} /> */}
            </Routes>
        </>
    );
}

export default App;