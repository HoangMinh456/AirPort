import { createSlice } from "@reduxjs/toolkit";

const ticketPicture = createSlice({
    name: 'ticketPicture',
    initialState: {
        myTicketPicture: '',
        otherTicketPicture: '',
        signature: '',
    },
    reducers: {
        saveTicket(state, action) {
            if (action.payload.type === 'myTicketPicture') {
                state.myTicketPicture = action.payload.uri;
            }

            if (action.payload.type === 'otherTicketPicture') {
                state.otherTicketPicture = action.payload.uri;
            }
        },
        saveSignature(state, action) {
            state.signature = action.payload;
        }
    }
});

export const { saveTicket, saveSignature } = ticketPicture.actions;
export default ticketPicture.reducer;