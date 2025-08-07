import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './auth/reducer';
import emailReducer from './email/reducer';
import interiorsReducer from './interiors/reducer';
import apothecaryReducer from './apothecary/reducer';
import abundanceReducer from './abundance/reducer';
import productReducer from './product/reducer';
import healthReducer from './health/reducer';
import zenaiReducer from './zenai/reducer';
import usersReducer from './users/reducer';
import subscriptionReducer from './subscription/reducer';
import journalReducer from './journal/reducer';
import ordersReducer from './orders/reducer';

const userPersistConfig = {
    key: 'user-root',
    storage,
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    email: emailReducer,
    interiors: interiorsReducer,
    apothecary: apothecaryReducer,
    abundance: abundanceReducer,
    health: healthReducer,
    product: productReducer,
    zenai: zenaiReducer,
    users: usersReducer,
    subscription: subscriptionReducer,
    journal: journalReducer,
    orders: ordersReducer,
});

export default rootReducer;
