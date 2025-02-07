import { configureStore } from '@reduxjs/toolkit'
import seminarsApi from './api/seminarApi'

const store = configureStore({
    reducer: {
        [seminarsApi.reducerPath]: seminarsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(seminarsApi.middleware),
})


export default store