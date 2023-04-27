import { userReducer } from './User/reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        singleUser: userReducer.reducer,
    },
});
