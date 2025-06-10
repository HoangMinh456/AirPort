import { API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOTP = createAsyncThunk('auth/sendOTP', async (userEmail: string, { rejectWithValue }) => {
    try {
        // console.log('API: ', API);
        const response = await axios.post(`${API}/send-otp`, { email: userEmail })
        // console.log('response: ', response)
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Gửi mã OTP thất bại');
    }
})

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async ({ userEmail, otp }: { userEmail: string, otp: string }, { rejectWithValue }) => {
    try {
        const resposne = await axios.post(`${API}/verify-otp`, { email: userEmail, otp: otp })
        // console.log('response: ', resposne)
        return resposne.data;
    } catch (error: any) {
        console.log('Lỗi ở createAsyncThunk "auth/verifyOTP": ', error)
        return rejectWithValue(error.response?.data?.message || 'Xác thực thất bại');
    }
})

export const createAccount = createAsyncThunk('auth/createAccount', async ({ userEmail, password }: { userEmail: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/create-account`, { email: userEmail, password: password })
        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở "auth/createAccount": ', error)
        return rejectWithValue(error.response.data.message || 'Tạo tài khoản thất bại')
    }
})

export const SignIn = createAsyncThunk('auth/signin', async ({ userEmail, password }: { userEmail: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/signin`, { email: userEmail, password: password });
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở "auth/signin": ', error.response.data.message)
        return rejectWithValue(error.response.data.message || 'Đăng nhập thất bại')
    }
})

export const getUserByEmail = createAsyncThunk('auth/forgotPassword', async (userEmail: string, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/getUserByEmail`, { email: userEmail })
        return response.data
    } catch (error) {
        console.log('Lỗi ở "auth/forgotPassword": ', error)
        return rejectWithValue(error)
    }
})

export const changePasswordByEmail = createAsyncThunk('auth/changePassword', async ({ userEmail, password }: { userEmail: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/changePassword`, { email: userEmail, password: password })
        return response.data;
    } catch (error) {
        console.log('Lỗi ở "auth/changePassword"', error)
        return rejectWithValue(error)
    }
})