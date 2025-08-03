import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from './providers/ReduxProvider';
import MuiThemeProvider from './providers/MuiProvider';
import CustomCursor from './components/ui/CustomCursor';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import './assets/styles/index.scss';
import './assets/styles/globals.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ReduxProvider>
            <MuiThemeProvider>
                <div className='relative overflow-hidden'>
                    <App />
                </div>
                <ToastContainer />
                <CustomCursor />
            </MuiThemeProvider>
        </ReduxProvider>
    </BrowserRouter>
);

reportWebVitals();
