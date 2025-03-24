import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../shared/api/baseApi';

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export const withProviders = (component: () => React.ReactNode) => () => (
    <Provider store={store}>
        <BrowserRouter>{component()}</BrowserRouter>
    </Provider>
);