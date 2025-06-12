import { API } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Hàm tạo vé máy bay
export const createTicketPlan = createAsyncThunk('ticketInfor/createTicketPlan', async (
    { userId, userUse, otherUse, userTicket, otherTicket, signature }
        :
        { userId: string, userUse: string, otherUse: string, userTicket: string, otherTicket?: string, signature: string }) => {
    const response = await axios.post(`${API}/createTicketPlan`, { userId, userUse, otherUse: otherUse || '', userTicket, otherTicket, signature })

    return response.data;
})

//Hàm lấy tất cả dữ liệu của vé máy bay
export const getAllTicketPlan = createAsyncThunk('ticketInfor/getAllTicketPlan', async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/getAllTicketPlan/${userId}`);
        // console.log('response.data: ', response.data);
        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở ticketInfor/getAllTicketPlan: ', error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

//Hàm lấy 1 vé máy bay để xem chi tiết
export const getSingleTicketPlanById = createAsyncThunk('ticketInfor/getSingleTicketPlanById', async ({ ticketId }: { ticketId: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/getSingleTicketPlanById/${ticketId}`);
        console.log('data single ticket plan: ', response.data);
        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở getSingleTicketPlanById', error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})