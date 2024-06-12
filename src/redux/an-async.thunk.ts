import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppAsyncThunkConfig} from "@/redux/reduxStore";

export const anAsyncThunk = createAsyncThunk<{ foo: string }, void, AppAsyncThunkConfig>('anAsyncThunk', async () => {
    return {
        foo: 'bar'
    }
})
