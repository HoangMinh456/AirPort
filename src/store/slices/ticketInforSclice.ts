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

interface TicketInforState {
    myTicketPicture: string;
    otherTicketPicture: string[];
    signature: string;
    userUse: number;
    otherUse: number;
    status: string;
    error: string;
}

const initialState: TicketInforState = {
    myTicketPicture: '',
    otherTicketPicture: [],
    signature: '',
    userUse: 0,
    otherUse: 0,
    status: 'idle',
    error: ''
};

const ticketInfor = createSlice({
    name: 'ticketInfor',
    initialState,
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
            if (action.payload.type === 'camera' && 'myTicketPicture'.includes(action.payload.saveTo)) {
                state.myTicketPicture = action.payload.uri;
            } else if (action.payload.type === 'camera' && 'otherTicketPicture'.includes(action.payload.saveTo)) {
                if (state.otherTicketPicture.length < state.otherUse) {
                    state.otherTicketPicture.push(action.payload.uri)
                }
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
        },
        removeTicket(state, action) {
            state.otherTicketPicture.splice(action.payload.index, 1);
        },
        changeTicket(state, action) {
            state.otherTicketPicture[action.payload.index] = action.payload.uri;
        },
        removeMyTicket(state) {
            console.log('Đã xóa ảnh chính')
            state.myTicketPicture = '';
        },
        changeMyTicket(state, action) {
            state.myTicketPicture = action.payload.uri;
        },
        resetAllStateTicketInfor(state) {
            state.myTicketPicture = '';
            state.otherTicketPicture = [];
            state.signature = '';
            state.userUse = 0;
            state.otherUse = 0;
            state.status = 'idle';
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicketPlan.pending, (state) => {
                state.status = 'pendingCreateTicketPlan';
            })
            .addCase(createTicketPlan.fulfilled, (state) => {
                state.status = 'successCreateTicketPlan';
                state.error = '';
            })
            .addCase(createTicketPlan.rejected, (state, action) => {
                state.status = 'failCreateTicketPlan';
                state.error = action.payload as string;
            })
    }
});

export const { saveTicket, saveSignature, saveNumberUses, setStatusTicketInfor, removeTicket, changeTicket, removeMyTicket, changeMyTicket, resetAllStateTicketInfor } = ticketInfor.actions;
export default ticketInfor.reducer;