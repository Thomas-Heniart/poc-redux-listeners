import {
    Action,
    combineReducers,
    configureStore,
    createListenerMiddleware,
    Store,
    ThunkDispatch,
} from '@reduxjs/toolkit'

import {GetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk'
import {fooSlice} from "@/redux/foo.slice";
import {anotherAsyncThunk} from "@/redux/another-async.thunk";
import {anAsyncThunk} from "@/redux/an-async.thunk";

export interface Dependencies {

}

const rootReducer = combineReducers({
    foo: fooSlice.reducer
})

const listenerMiddleware = createListenerMiddleware<AppState, AppDispatch, Dependencies>()
listenerMiddleware.startListening({
    actionCreator: anAsyncThunk.fulfilled,
    effect: async ({payload}, listenerApi) => {
        await listenerApi.dispatch(anotherAsyncThunk(payload))
    }
})

export const initReduxStore = (dependencies: Partial<Dependencies>, preloadedState?: Partial<AppState>): ReduxStore => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: true,
        middleware: (getDefaultMiddleware: GetDefaultMiddleware<AppState>) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies,
                },
            })
                .prepend(listenerMiddleware.middleware),
    })
}

export type AppState = ReturnType<typeof rootReducer>

export type ReduxStore = Store<AppState> & {
    dispatch: ThunkDispatch<AppState, Dependencies, Action>
}

export type AppAsyncThunkConfig = BaseThunkAPI<AppState, Dependencies, AppDispatch>

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>
