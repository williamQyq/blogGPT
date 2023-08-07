import { applyMiddleware, PreloadedState } from 'redux';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import thunk from 'redux-thunk';
import {
    PersistConfig,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducer, { IAppState } from './index';


const persistConfig: PersistConfig<IAppState> = {
    key: "root",
    storage: storage,
    blacklist: ['extras'],  //skip persisting sub-trees of your state
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState: PreloadedState<any> = {};
const middleware: Middleware[] = [
    thunk,
    createStateSyncMiddleware({
        blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
    })
];
const middlewareEnhancer = applyMiddleware(...middleware);
const enhancers = [middlewareEnhancer];
// const composedEnhancers = composeWithDevTools(...enhancers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    enhancers: [...enhancers],
    middleware:
        (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: {
                    warnAfter: 128
                },
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                }
            })
});

initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;