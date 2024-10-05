import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authSlice from "./reducers/auth";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";
import webrtcSlice from "./reducers/webrtc";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [webrtcSlice.name]: webrtcSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;
