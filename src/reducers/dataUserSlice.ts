import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleBarCodeRead = createAsyncThunk('dataUser/get', async (urlAPI: string) => {
    const response = await axios.get(urlAPI);
    console.log('response', response.data);
})

const dataUserSlice = createSlice({
    name: 'dataUser',
    initialState: {
        numberCard: ''
    },
    reducers: {},
    extraReducers: (builder) => {

    }
})

// export { } = dataUserSlice.actions;
export default dataUserSlice.reducer;