import { configureStore } from "@reduxjs/toolkit";
import notifiSlice from '../reducers/notifiSlice';
import ticketPicture from '../reducers/ticketPictureSclice';
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        notifi: notifiSlice,
        ticketPicture: ticketPicture,
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()