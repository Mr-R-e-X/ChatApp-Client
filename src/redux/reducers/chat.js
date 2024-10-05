import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/feature";
import { NEW_MESSAGE_ALERT } from "../../constants/event.constants";

const initialState = {
  notificationsCount: 0,
  newMessageAlert:
    getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, get: true }) || [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    increamentNotificationsCount: (state) => {
      state.notificationsCount = state.notificationsCount + 1;
    },
    resetNotificationsCount: (state) => {
      state.notificationsCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index === -1) {
        state.newMessageAlert.push({
          chatId,
          count: 1,
        });
      } else {
        state.newMessageAlert[index].count =
          Number(state.newMessageAlert[index].count) + 1;
      }
    },
    resetMessageAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== action.payload
      );
      getOrSaveFromStorage({key: NEW_MESSAGE_ALERT, value:state.newMessageAlert, get:false
      })
    },
  },
});

export default chatSlice;
export const {
  increamentNotificationsCount,
  resetNotificationsCount,
  setNewMessageAlert,
  resetMessageAlert,
} = chatSlice.actions;
