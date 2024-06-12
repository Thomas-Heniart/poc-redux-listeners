import {createSlice} from "@reduxjs/toolkit";

import {anotherAsyncThunk} from "@/redux/another-async.thunk";

export const fooSlice = createSlice({
    name: 'foo',
    initialState: () => ({foo: ''}),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(anotherAsyncThunk.fulfilled, (state, {payload}) => {
            console.log('Should pass here before the expectation')
            state.foo = payload.foo
        })
    }
})
