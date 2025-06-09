import { API } from "@env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTicketPlan = createAsyncThunk('ticketInfor/createTicketPlan', async (
    { userId, userUse, otherUse, userTicket, otherTicket, signature }
        :
        { userId: string, userUse: string, otherUse: string, userTicket: string, otherTicket?: string, signature: string }) => {
    const response = await axios.post(`${API}/createTicketPlan`, { userId, userUse, otherUse: otherUse || '', userTicket, otherTicket, signature })

    return response.data;
})

const ticketInfor = createSlice({
    name: 'ticketInfor',
    initialState: {
        myTicketPicture: '',
        otherTicketPicture: '',
        signature: '',
        userUse: 0,
        otherUse: 0,
        status: 'idle',
        error: ''
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
        },
        saveNumberUses(state, action) {
            state.userUse = action.payload.userUse;
            state.otherUse = action.payload.otherUse;
        },
        setStatusTicketInfor(state) {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicketPlan.pending, (state) => {
                state.status = 'pendingCreateTicketPlan';
            })
            .addCase(createTicketPlan.fulfilled, (state, action) => {
                state.status = 'successCreateTicketPlan';
                state.error = '';
            })
            .addCase(createTicketPlan.rejected, (state, action) => {
                state.status = 'failCreateTicketPlan';
                state.error = action.payload as string;
            })
    }
});

export const { saveTicket, saveSignature, saveNumberUses, setStatusTicketInfor } = ticketInfor.actions;
export default ticketInfor.reducer;