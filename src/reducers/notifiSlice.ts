import { createSlice } from "@reduxjs/toolkit";

const notifiSlice = createSlice({
    name: 'notifi',
    initialState: {
        type: 'hidden',
        message: false,
        button: false,
        title: '',
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
        },
    },
});

export const { showOff, showLoading, ShowModal } = notifiSlice.actions;

export default notifiSlice.reducer;