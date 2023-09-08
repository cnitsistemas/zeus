import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch