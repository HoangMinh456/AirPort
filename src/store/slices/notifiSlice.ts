import { createSlice } from "@reduxjs/toolkit";

const notifiSlice = createSlice({
    name: 'notifi',
    initialState: {
        type: 'hidden',
        message: false,
        button: false,
        title: '',
        titleButtonClose: '',
        titleButtonAccept: '',
        onPressButtonClose: undefined,
        onPressButtonAccept: undefined,
    },
    reducers: {
        showOff(state) {
            state.type = 'hidden';
        },
        showLoading(state) {
            // console.log('state.type: loading');
            state.type = 'loading';
        },
        ShowModal(state, action) {
            // console.log('payload', action.payload.message)
            state.type = 'modal';
            state.message = action.payload.message;
            state.button = action.payload?.button || false;
            state.title = action.payload.title;
            state.titleButtonClose = action.payload.titleButtonClose || '';
            state.titleButtonAccept = action.payload.titleButtonAccept || '';
            state.onPressButtonClose = action.payload.onPressButtonClose || undefined;
            state.onPressButtonAccept = action.payload.onPressButtonAccept || undefined;
        },
    },
});

export const { showOff, showLoading, ShowModal } = notifiSlice.actions;

export default notifiSlice.reducer;