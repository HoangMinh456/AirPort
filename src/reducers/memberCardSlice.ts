import { API } from "@env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMemberCardByECode = createAsyncThunk('memberCard/get', async (eCode: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/${eCode}`);

        return response.data;
    } catch (error) {
        console.log('Lỗi ở "memberCard/get": ', error)
        return rejectWithValue(error)
    }
})

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
                state.error = action.error;
            })
    }
})

export default memberCardSlice.reducer;