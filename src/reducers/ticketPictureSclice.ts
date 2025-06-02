import { createSlice } from "@reduxjs/toolkit";

const ticketPicture = createSlice({
    name: 'ticketPicture',
    initialState: {
        myTicketPicture: '',
        otherTicketPicture: '',
        signature: '',
    },
    reducers: {
        saveTicket(
            state,
            action: {
                payload: {
                    type: string;
                    saveTo: 'myTicketPicture' | 'otherTicketPicture';
                    uri: string;
                };
            }
        ) {
            if (action.payload.type === 'camera' && ['myTicketPicture', 'otherTicketPicture'].includes(action.payload.saveTo)) {
                state[action.payload.saveTo] = action.payload.uri;
            }
        },
        saveSignature(state, action) {
            state.signature = action.payload;
        }
    }
});

export const { saveTicket, saveSignature } = ticketPicture.actions;
export default ticketPicture.reducer;