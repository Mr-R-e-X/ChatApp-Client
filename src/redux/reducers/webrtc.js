import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callStatus: {
    haveMedia: false,
    videoEnabled: false,
    audioEnabled: false,
  },
  typeOfCall: null,
  isOnCall: false,
  
};

const webrtcSlice = createSlice({
  name: "webrtc",
  initialState,
  reducers: {
    setCallStatus: (state, action) => {
      state.callStatus = action.payload;
    },

    setIsOnCall: (state, action) => {
      state.isOnCall = action.payload;
    },

    setTypeOfCall: (state, action) => {
      state.typeOfCall = action.payload;
    },
  },
});

export default webrtcSlice;
export const { setCallStatus, setIsOnCall, setTypeOfCall } =
  webrtcSlice.actions;
