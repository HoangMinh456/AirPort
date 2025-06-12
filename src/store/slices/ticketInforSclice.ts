import { createSlice } from "@reduxjs/toolkit";
import { createTicketPlan, getAllTicketPlan, getSingleTicketPlanById } from "../thunks/ticketInforThunk";

interface TicketInforState {
    myTicketPicture: string;
    otherTicketPicture: string[];
    signature: string;
    userUse: number;
    otherUse: number;
    status: string;
    error: string;
    ticketPlanStore: string[]
}

const initialState: TicketInforState = {
    myTicketPicture: '',
    otherTicketPicture: [],
    signature: '',
    userUse: 0,
    otherUse: 0,
    status: 'idle',
    error: '',
    ticketPlanStore: []
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
            .addCase(getAllTicketPlan.pending, (state) => {
                state.status = 'pendingGetAllTicketPlan';
            })
            .addCase(getAllTicketPlan.fulfilled, (state, action) => {
                state.status = 'successGetAllTicketPlan';
                state.ticketPlanStore = action.payload;
            })
            .addCase(getAllTicketPlan.rejected, (state, action) => {
                state.status = 'failGetAllTicketPlan';
                state.error = action.payload as string;
            })
            .addCase(getSingleTicketPlanById.pending, (state) => {
                state.status = 'pendingGetSingleTicketPlanById';
            })
            .addCase(getSingleTicketPlanById.fulfilled, (state) => {
                state.status = 'successGetSingleTicketPlan';
            })
            .addCase(getSingleTicketPlanById.rejected, (state, action) => {
                state.status = 'failGetSingleTicketPlan';
                state.error = action.payload as string;
            })
    }
});

export const { saveTicket, saveSignature, saveNumberUses, setStatusTicketInfor, removeTicket, changeTicket, removeMyTicket, changeMyTicket, resetAllStateTicketInfor } = ticketInfor.actions;
export default ticketInfor.reducer;