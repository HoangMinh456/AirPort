import { createSlice } from "@reduxjs/toolkit";
import { changePasswordByEmail, createAccount, getUserByEmail, sendOTP, SignIn, updateUserInformation, verifyOTP } from "../thunks/authThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        information: {
            _id: '',
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
            AsyncStorage.removeItem('userData');
        },
        setStatusIdle(state) {
            state.status = 'idle';
        },
        setDataUser(state, action) {
            state.information = action.payload;
        },
        setNewEmail(state, action) {
            state.information.email = action.payload.email;
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
                state.status = 'successCreateAccount';
                state.information.email = action.payload.email;
                state.information.password = action.payload.password;
                state.information.userName = action.payload.userName;
                state.information._id = action.payload._id;
                state.error = '';
            })
            .addCase(createAccount.rejected, (state: any, action: any) => {
                state.status = 'failCreateAccount';
                state.error = action.payload;
            })
            .addCase(SignIn.pending, (state: any) => {
                state.status = 'pendingSignIn';
            })
            .addCase(SignIn.fulfilled, (state: any, action: any) => {
                // console.log('payload: ', action.payload._id)
                state.status = 'successSignIn';
                state.information.email = action.payload.email;
                state.information.phone = action.payload.phone;
                state.information.password = action.payload.password;
                state.information.userName = action.payload.userName;
                state.information._id = action.payload._id;
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
            .addCase(updateUserInformation.pending, (state: any) => {
                state.status = 'pendingUpdateUserInformation';
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.status = 'successUpdateUserInformation';
                state.information.email = action.payload.email;
                state.information.phone = action.payload.phone;
                state.information.userName = action.payload.userName;
                state.error = ''
            })
            .addCase(updateUserInformation.rejected, (state, action) => {
                state.status = 'failUpdateUserInformation';
                state.error = action.payload as string;
            })
    }
})

export const { logOut, setStatusIdle, setDataUser, setNewEmail } = authSlice.actions;
export default authSlice.reducer;