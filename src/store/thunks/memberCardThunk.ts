import { API } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMemberCardByECode = createAsyncThunk('memberCard/get', async (eCode: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/getMemberCardByECode/${eCode}`);

        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message || // nếu server trả về JSON có message
            error.response?.statusText ||    // nếu có statusText
            error.message || 'Đã xảy ra lỗi';   // fallback

        console.log('Lỗi ở "memberCard/get": ', error)
        return rejectWithValue(message)
    }
})