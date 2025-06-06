import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from '@env';

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

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        information: {
            email: '',
            phone: '',
            password: '',
            userName: ''
        },
        status: 'idle',
        error: ''
    },
    reducers: {
        logOut(state) {
            state.information.email = ''
        },
        setStatusIdle(state) {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOTP.pending, (state: any) => {
                state.status = 'senddingOTP';
            })
            .addCase(sendOTP.fulfilled, (state: any) => {
                state.status = 'successSendding';
                state.error = ''
            })
            .addCase(sendOTP.rejected, (state: any, action: any) => {
                state.status = 'senddingFail';
                state.error = action.error.message;
            })
            .addCase(verifyOTP.pending, (state: any) => {
                state.status = 'pedingVerify';
            })
            .addCase(verifyOTP.fulfilled, (state: any) => {
                state.status = 'successVerify';
                state.error = ''
            })
            .addCase(verifyOTP.rejected, (state: any, action: any) => {
                state.status = 'failVerify';
                state.error = action.payload;
            })
            .addCase(createAccount.pending, (state: any) => {
                state.status = 'pendingCreateAccount'
            })
            .addCase(createAccount.fulfilled, (state: any, action: any) => {
                // console.log('action.payload: ', action.payload)
                state.status = 'successCreateAccount'
                state.information.email = action.payload.email;
                state.information.password = action.payload.password;
                state.information.userName = action.payload.userName;
                state.error = ''
            })
            .addCase(createAccount.rejected, (state: any, action: any) => {
                state.status = 'failCreateAccount';
                state.error = action.payload;
            })
            .addCase(SignIn.pending, (state: any) => {
                state.status = 'pendingSignIn'
            })
            .addCase(SignIn.fulfilled, (state: any, action: any) => {
                state.status = 'successSignIn';
                state.information.email = action.payload.email;
                state.information.phone = action.payload.phone;
                state.information.password = action.payload.password;
                state.information.userName = action.payload.userName;
                state.error = ''
            })
            .addCase(SignIn.rejected, (state: any, action: any) => {
                state.status = 'failSignIn';
                state.error = action.payload;
            })
            .addCase(getUserByEmail.pending, (state: any) => {
                state.status = 'pendingGetUserByEmail';
            })
            .addCase(getUserByEmail.fulfilled, (state: any, action: any) => {
                state.status = 'successGetUserByEmail';
                state.error = ''
            })
            .addCase(getUserByEmail.rejected, (state: any) => {
                state.status = 'failGetUserByEmail';
            })
            .addCase(changePasswordByEmail.pending, (state: any) => {
                state.status = 'pendingChangePassword';
            })
            .addCase(changePasswordByEmail.fulfilled, (state: any, action: any) => {
                // console.log('payload: ', action.payload)
                state.status = 'successChangePassword';
                state.information.password = action.payload.password;
                state.information.email = action.payload.email;
                state.information.phone = action.payload.phone;
                state.information.userName = action.payload.userName;
                state.error = ''
            })
            .addCase(changePasswordByEmail.rejected, (state: any, action: any) => {
                state.status = 'failChangePassword';
                state.error = action.payload;
            })
    }
})

export const { logOut, setStatusIdle } = authSlice.actions;
export default authSlice.reducer;