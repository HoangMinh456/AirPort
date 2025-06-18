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
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['notifi/ShowModal'], // Bỏ qua kiểm tra cho action này
                ignoredPaths: ['notifi.onPressButtonClose', 'notifi.onPressButtonAccept', 'notifi.onPressSingleButton'], // Bỏ qua kiểm tra cho các trường này
            },
        }),
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()