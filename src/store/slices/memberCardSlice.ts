import { createSlice } from "@reduxjs/toolkit";
import { getMemberCardByECode } from "../thunks/memberCardThunk";

const memberCardSlice = createSlice({
    name: 'memberCard',
    initialState: {
        userInfomation: {},
        eCode: '',
        totalUse: 0,
        totalUsed: 0,
        userRemain: 0,
        otherRemain: 0,
        status: 'idle',
        error: ''
    },
    reducers: {
        setStatusMemberCardIdle(state) {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMemberCardByECode.pending, (state: any) => {
                state.status = 'pendingGetMemberCard';
            })
            .addCase(getMemberCardByECode.fulfilled, (state: any, action: any) => {
                // console.log('Payload: ', action)
                state.status = 'successGetMemberCard';
                state.userInfomation = action.payload.userId;
                state.eCode = action.payload.eCode;
                state.totalUse = action.payload.totalUse;
                state.totalUsed = action.payload.totalUsed;
                state.userRemain = action.payload.userRemain;
                state.otherRemain = action.payload.otherRemain;
            })
            .addCase(getMemberCardByECode.rejected, (state: any, action: any) => {
                state.status = 'failGetMemberCard';
                state.error = action.payload as string;
            })
    }
})

export const { setStatusMemberCardIdle } = memberCardSlice.actions;
export default memberCardSlice.reducer;