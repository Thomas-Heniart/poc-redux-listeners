import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppAsyncThunkConfig} from "@/redux/reduxStore";

export const anotherAsyncThunk = createAsyncThunk<{ foo: string }, {
    foo: string
}, AppAsyncThunkConfig>('anotherAsyncThunk', async ({foo}) => {
    return {
        foo
    }
})
