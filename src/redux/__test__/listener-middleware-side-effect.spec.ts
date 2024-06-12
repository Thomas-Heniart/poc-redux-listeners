import {initReduxStore, ReduxStore} from "@/redux/reduxStore";
import {anAsyncThunk} from "@/redux/an-async.thunk";
import {waitFor} from "@testing-library/dom";

describe('Listener middleware side effect', () => {
    let store: ReduxStore

    beforeEach(() => {
        store = initReduxStore({})
    })

    it('should update slice state through extra reducer', async () => {
        await store.dispatch(anAsyncThunk())

        expect(foo()).toEqual('bar')
    })

    it('works when using testing-library waitFor', async () => {
        await store.dispatch(anAsyncThunk())

        await waitFor(() => {
            expect(foo()).toEqual('bar')
        })
    })

    const foo = () => {
        console.log('Should pass here after the extraReducer')
        return store.getState().foo.foo
    }
})

