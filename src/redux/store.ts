import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminAuth from "./ReduxFunction";
import baseApi from "./Api/baseApi";
import messagesBaseApi from "./Api/messagesBaseApi";
import stripeApi from "./Api/stripeApi"; // Import Stripe API slice
import forgotEmailReducer from "./allSlice/otpSlice";
import formReducer from "./allSlice/formslice";
import travelSearchReducer from "./allSlice/travelSearchSlice";

// Persist configuration for `formData`
const formPersistConfig = {
  key: "formData",
  storage,
};

const persistedFormReducer = persistReducer(formPersistConfig, formReducer);

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, adminAuth);

export const store = configureStore({
  reducer: {
    forgotPass: forgotEmailReducer,
    Auth: persistedReducer,
    formData: persistedFormReducer,
    travelSearch: travelSearchReducer, // Add the travelSearchReducer here

    // Add API reducers
    [baseApi.reducerPath]: baseApi.reducer,
    [messagesBaseApi.reducerPath]: messagesBaseApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["Auth.somePathWithNonSerializableValues"],
      },
    }).concat(
      baseApi.middleware,
      messagesBaseApi.middleware,
      stripeApi.middleware
    ), // Concatenate all middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
