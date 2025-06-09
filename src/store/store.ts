import { configureStore } from "@reduxjs/toolkit";
import notifiSlice from './slices/notifiSlice';
import ticketInfor from './slices/ticketInforSclice';
import authSlice from './slices/authSlice';
import memberCard from './slices/memberCardSlice';
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        notifi: notifiSlice,
        ticketInfor: ticketInfor,
        auth: authSlice,
        memberCard: memberCard,
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()