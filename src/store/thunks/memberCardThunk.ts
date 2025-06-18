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

export const updateMemberCard = createAsyncThunk('memberCard/update', async ({ eCode, userUse, otherUse }: { eCode: string, userUse: number, otherUse: number }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/updateMemberCard`, { eCode: eCode, userUse: userUse, otherUse: otherUse });

        return response.data;
    } catch (error: any) {
        const message = error.response.data.message;
        console.log('Lỗi ở memberCard/update: ', message);
        return rejectWithValue(message);
    }
})

export const getECodeByQR = createAsyncThunk('memberCard/getECodeByQR', async ({ API_URL }: { API_URL: string }, { rejectWithValue }) => {
    const newURL = API_URL.replace("http://localhost:3000", API);
    // console.log('newURL: ', newURL);
    try {
        const response = await axios.get(newURL.trim());
        // console.log('response.data: ', response.data);
        return response.data;
    } catch (error: any) {
        const message = error.response.data.message;
        console.log('Lỗi ở memberCard/getECodeByQR', message)
        return rejectWithValue(message);
    }
})