import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobileMenu: false,
  isAboutUser: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
  selectedChatInfo: {
    chatId: "",
    groupChat: false,
  },
  isRightDrawerOpen: false,
  groupCretatorOptions: false,
  isEditGroupName: false,
  currentChatDetails: {
    admins: [],
    avatar: [],
    createdAt: "",
    creator: "",
    groupChat: false,
    members: [],
    name: "",
    updatedAt: "",
    __v: 0,
    _id: "",
  },
  currentChatMesages: [],
  chatListVisibitlityForMobie: true,
  isProfileDrawerOpen: false,
  isChatOptionsOpen: false,
  openSmallScreenOptions: false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotifiaction: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobileMenu: (state, action) => {
      state.isMobileMenu = action.payload;
    },
    setIsAboutUser: (state, action) => {
      state.isAboutUser = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
    setselectedChatInfo: (state, action) => {
      state.selectedChatInfo = action.payload;
    },
    setRightDrawerOpen: (state, action) => {
      state.isRightDrawerOpen = action.payload;
    },
    setGroupCretatorOptions: (state, action) => {
      state.groupCretatorOptions = action.payload;
    },
    setIsEditGroupName: (state, action) => {
      state.isEditGroupName = action.payload;
    },
    setCurrentChatDetails: (state, action) => {
      state.currentChatDetails = action.payload;
    },
    updateCurrentGroupChatAdmins: (state, action) => {
      state.currentChatDetails.admins.push(action.payload);
    },
    updateCurrentGroupChatMembers: (state, action) => {
      state.currentChatDetails.members =
        state.currentChatDetails.members.filter(
          (member) => member._id !== action.payload
        );
    },
    addCurrentGroupChatMember: (state, action) => {
      state.currentChatDetails.members = [
        ...state.currentChatDetails.members,
        ...action.payload,
      ];
    },
    updateCurrentGroupChatName: (state, action) => {
      state.currentChatDetails.name = action.payload;
    },
    updateCurrentGroupChatCreator: (state, action) => {
      state.currentChatDetails.creator = action.payload;
    },
    updateCurrentChatMessages: (state, action) => {
      state.currentChatMesages = action.payload;
    },
    setChatListVisibilityForMobile: (state, action) => {
      state.chatListVisibitlityForMobie = action.payload;
    },
    setIsProfileDrawerOpen: (state, action) => {
      state.isProfileDrawerOpen = action.payload;
    },
    setIsChatOptionsOpen: (state, action) => {
      state.isChatOptionsOpen = action.payload;
    },
    setSmallScreenOptions: (state, action) => {
      state.openSmallScreenOptions = action.payload;
    },
  },
});
export default miscSlice;
export const {
  setIsNewGroup,
  setAddMember,
  setIsNotifiaction,
  setIsMobileMenu,
  setIsAboutUser,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
  setselectedChatInfo,
  setRightDrawerOpen,
  setGroupCretatorOptions,
  setIsEditGroupName,
  setCurrentChatDetails,
  updateCurrentGroupChatAdmins,
  updateCurrentGroupChatCreator,
  updateCurrentGroupChatName,
  updateCurrentGroupChatMembers,
  addCurrentGroupChatMember,
  updateCurrentChatMessages,
  setChatListVisibilityForMobile,
  setIsProfileDrawerOpen,
  setIsChatOptionsOpen,
  setSmallScreenOptions,
} = miscSlice.actions;
