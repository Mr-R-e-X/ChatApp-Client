import {
  Add as AddIcon,
  AlternateEmail as AlternateEmailIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Diversity3 as Diversity3Icon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  Email as EmailIcon,
  Logout as LogoutIcon,
  PhonelinkLock as PhonelinkLockIcon,
  RememberMe as RememberMeIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  Skeleton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AvatarChatInfoCard } from "../components/shared/AvatarCard";
import UserListPage from "../components/specific/UserListPage";
import { secondaryColor } from "../constants/color";
import { executeMutation, useDetectSmallScreen } from "../hooks/hooks";
import {
  useDeleteChatMutation,
  useLazyGetChatDetailsQuery,
  useLeaveGroupMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import {
  setAddMember,
  setChatListVisibilityForMobile,
  setCurrentChatDetails,
  setIsEditGroupName,
  setRightDrawerOpen,
  setSelectedDeleteChat,
  updateCurrentGroupChatName,
} from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const ChatInfoDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useDetectSmallScreen();

  const { user } = useSelector((state) => state.auth);
  const {
    isRightDrawerOpen,
    selectedChatInfo,
    isAddMember,
    isEditGroupName,
    currentChatDetails,
    isMobileMenu,
  } = useSelector((state) => state.misc);

  const chatId = selectedChatInfo.chatId;
  const groupChat = selectedChatInfo.groupChat;

  const [getChatDetails] = useLazyGetChatDetailsQuery();
  const [deleteChatOrGroup, _, deleteChatOrGroupData] = executeMutation(
    useDeleteChatMutation
  );
  const [leaveGroup, __, leaveGroupData] = executeMutation(
    useLeaveGroupMutation
  );

  const [confirmDeletDialog, setConfirmDeleteDialog] = useState(false);
  const [leaveChat, setLeaveChat] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    setLeaveChat(false);
  };
  const deleteHandler = () => {
    if (!groupChat) {
      deleteChatOrGroup("Deleting chat...", { id: chatId });
    } else {
      deleteChatOrGroup("Deleting group...", { id: chatId });
    }
    closeConfirmDeleteHandler();
    dispatch(setSelectedDeleteChat({ chatId: "", groupChat: false }));
    dispatch(setRightDrawerOpen(false));
  };

  const leaveConfirmHandler = () => {
    openConfirmDeleteHandler();
    setLeaveChat(true);
  };

  const leaveGroupHandler = () => {
    leaveGroup("Leaving the group", { id: selectedChatInfo.chatId });
    closeConfirmDeleteHandler();
    setLeaveChat(false);
  };

  const addMemberHandler = () => {
    dispatch(setAddMember(true));
  };

  const openChangeGroupNameHandler = () => {
    dispatch(setIsEditGroupName(true));
  };

  const handleOpen = () => {
    dispatch(setRightDrawerOpen(true));
  };
  const handleClose = () => {
    dispatch(setRightDrawerOpen(false));
  };

  useEffect(() => {
    if (deleteChatOrGroupData || leaveGroupData) {
      if (isSmallScreen) dispatch(setChatListVisibilityForMobile(true));
      else navigate("/");
    }
  }, [deleteChatOrGroupData, leaveGroupData]);

  useEffect(() => {
    const fetchChatDetails = async () => {
      if (isRightDrawerOpen && chatId) {
        const toastId = toast.loading("Fetching chat details...");
        try {
          const data = await getChatDetails(
            { chatId, populate: true },
            { skip: !isRightDrawerOpen || !chatId }
          );
          if (data.isSuccess) {
            dispatch(setCurrentChatDetails(data?.data?.data?.chat));
            setLoadingDetails(false);
            toast.success("Chat details fetched ...", { id: toastId });
          }
        } catch (err) {
          console.error("Failed to fetch chat details:", err);
          toast.error("Failed to fetch chat details", { id: toastId });
        }
      }
    };

    fetchChatDetails();
  }, [isRightDrawerOpen, chatId, getChatDetails]);

  return (
    <SwipeableDrawer
      anchor="right"
      open={isRightDrawerOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <Box
        sx={{
          padding: "1rem",
          background: secondaryColor,
          width: {
            xs: "100vw",
            sm: "70vw",
            md: "60vw",
            lg: "50vw",
          },
          maxHeight: "100%",
          minHeight: "100%",
          overflow: "hidden",
        }}
      >
        <IconButton onClick={() => dispatch(setRightDrawerOpen(false))}>
          <CloseIcon />
        </IconButton>

        {groupChat && (
          <Box>
            {loadingDetails ? (
              <Skeleton />
            ) : (
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <AvatarChatInfoCard
                  avatar={currentChatDetails?.avatar}
                  height={"100px"}
                  width={"100px"}
                />

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  textAlign={"center"}
                  justifyContent={"center"}
                  spacing={"0.3rem"}
                  marginTop={"1rem"}
                >
                  <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                    {currentChatDetails.name}
                  </Typography>
                  {currentChatDetails?.admins?.includes(user?._id.toString()) ||
                  user._id.toString() === currentChatDetails?.creator ? (
                    <IconButton onClick={openChangeGroupNameHandler}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  textAlign={"center"}
                  justifyContent={"center"}
                  spacing={"0.3rem"}
                  marginTop={"1rem"}
                >
                  <Typography
                    variant="caption"
                    color={"springgreen"}
                    fontSize={"1rem"}
                    sx={{ padding: "0 1rem" }}
                  >
                    Group Chat
                  </Typography>
                  <Diversity3Icon />
                  <Typography
                    color="grey"
                    variant="caption"
                    fontSize={"1rem"}
                    sx={{ padding: "0 1rem" }}
                  >
                    {currentChatDetails.members.length} Participants
                  </Typography>
                </Stack>
                <UserListPage
                  members={currentChatDetails?.members}
                  admins={currentChatDetails?.admins}
                  creator={currentChatDetails?.creator}
                  currentUser={user._id}
                  chatId={currentChatDetails._id}
                />
                {user._id.toString() === currentChatDetails?.creator && (
                  <Stack
                    display={"flex"}
                    direction={"row"}
                    gap={"1rem"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <UseButtonGroups
                      color="error"
                      btnText="Leave Group"
                      ShowIcon={<LogoutIcon />}
                      id={user?._id}
                      handler={leaveConfirmHandler}
                    />
                    <UseButtonGroups
                      color="success"
                      btnText="Add Member"
                      ShowIcon={<AddIcon />}
                      id={""}
                      handler={addMemberHandler}
                    />
                    <UseButtonGroups
                      color="error"
                      ShowIcon={<DeleteIcon />}
                      btnText="Delete Group"
                      id={currentChatDetails?._id}
                      handler={openConfirmDeleteHandler}
                    />
                  </Stack>
                )}
                {currentChatDetails?.admins?.includes(user?._id.toString()) &&
                  user._id.toString() !== currentChatDetails?.creator && (
                    <Stack
                      display={"flex"}
                      direction={"row"}
                      gap={"1rem"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <UseButtonGroups
                        color="error"
                        btnText="Leave Group"
                        ShowIcon={<LogoutIcon />}
                        id={user?._id}
                        handler={leaveConfirmHandler}
                      />
                      <UseButtonGroups
                        color="success"
                        btnText="Add Member"
                        ShowIcon={<AddIcon />}
                        id={user?._id}
                        handler={addMemberHandler}
                      />
                    </Stack>
                  )}
                {!currentChatDetails?.admins?.includes(user?._id.toString()) &&
                  user._id.toString() !== currentChatDetails?.creator && (
                    <Stack
                      display={"flex"}
                      direction={"row"}
                      gap={"1rem"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <UseButtonGroups
                        color="error"
                        ShowIcon={<LogoutIcon />}
                        btnText="Leave Group"
                        id={user?._id}
                        handler={leaveConfirmHandler}
                      />
                    </Stack>
                  )}
              </Stack>
            )}
          </Box>
        )}

        {!groupChat && (
          <Stack>
            {loadingDetails ? (
              <Skeleton />
            ) : (
              <>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <AvatarChatInfoCard
                    avatar={[currentChatDetails?.members[0]?.avatar]}
                  />

                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    textAlign={"center"}
                    justifyContent={"center"}
                    spacing={"0.3rem"}
                    marginTop={"1rem"}
                  >
                    <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                      {currentChatDetails?.members[0].name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    textAlign={"center"}
                    justifyContent={"center"}
                    spacing={"0.3rem"}
                    marginTop={"1rem"}
                  >
                    <Typography
                      variant="caption"
                      color={"springgreen"}
                      fontSize={"1rem"}
                      sx={{ padding: "0 1rem" }}
                    >
                      Private Chat
                    </Typography>
                    <PhonelinkLockIcon />
                    <Typography
                      color="grey"
                      variant="caption"
                      fontSize={"1rem"}
                      sx={{ padding: "0 1rem" }}
                    >
                      {currentChatDetails.members.length} Participants
                    </Typography>
                  </Stack>

                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap={"wrap"}
                    margin={"2rem 0"}
                  >
                    <AlternateEmailIcon
                      color="primary"
                      sx={{ marginRight: "0.5rem" }}
                    />
                    <Typography
                      variant="body1"
                      color={"primary"}
                      sx={{ marginRight: "1rem" }}
                    >
                      {currentChatDetails?.members[0].username}
                    </Typography>
                    <EmailIcon color="success" sx={{ marginRight: "0.5rem" }} />
                    <Typography variant="body1" color={"springgreen"}>
                      {currentChatDetails?.members[0].email}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap={"wrap"}
                    sx={{ marginBottom: "2rem" }}
                  >
                    <RememberMeIcon
                      color="info"
                      sx={{ marginRight: "0.5rem" }}
                    />
                    <Typography variant="body1" color={"orange"}>
                      {currentChatDetails?.members[0].bio}
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  flexWrap={"wrap"}
                  gap={"1rem"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <UseButtonGroups
                    color="error"
                    ShowIcon={<DeleteIcon />}
                    btnText="Delete Chat"
                    id={chatId}
                    handler={openConfirmDeleteHandler}
                  />
                </Stack>
              </>
            )}
          </Stack>
        )}

        {confirmDeletDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeletDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={leaveChat ? leaveGroupHandler : deleteHandler}
            />
          </Suspense>
        )}

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )}

        {isEditGroupName && (
          <ChangeGroupnameDialog
            currentGroupName={currentChatDetails.name}
            chatId={chatId}
          />
        )}
      </Box>
    </SwipeableDrawer>
  );
};

const UseButtonGroups = ({
  btnText = "",
  ShowIcon,
  handler,
  id = "",
  color = "",
}) => {
  return (
    <Button
      variant="contained"
      color={color}
      size="small"
      onClick={() => handler(id)}
      sx={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <div>{ShowIcon}</div>
      <Box component={"span"} sx={{ display: { xs: "none", sm: "block" } }}>
        {btnText}
      </Box>
    </Button>
  );
};

const ChangeGroupnameDialog = ({ currentGroupName, chatId }) => {
  const dispatch = useDispatch();
  const { isEditGroupName } = useSelector((state) => state.misc);

  const [currentValue, setCurrentValue] = useState(currentGroupName);

  const [renameGroup, _, renameGroupData] = executeMutation(
    useRenameGroupMutation
  );

  const changeNameHandler = (e) => {
    setCurrentValue(e.target.value);
  };
  const closeChangeGroupNameHandler = () => {
    dispatch(setIsEditGroupName(false));
  };
  const handleRenameGroup = () => {
    if (currentGroupName.trim() === currentValue.trim())
      return toast.error("Group name is unchanged");
    renameGroup("Changing Group Name...", { chatId, name: currentValue });
    dispatch(setIsEditGroupName(false));
    dispatch(updateCurrentGroupChatName(currentValue));
  };

  useEffect(() => {
    if (renameGroupData?.isSuccess) {
      toast.success("Group name changed successfully!");
    }
    if (renameGroupData?.isError) {
      toast.error("Failed to change group name.");
    }
  }, [renameGroupData]);

  return (
    <>
      <Button variant="outlined">Open responsive dialog</Button>
      <Dialog open={isEditGroupName} onClose={closeChangeGroupNameHandler}>
        <DialogTitle id="responsive-dialog-title">Rename Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Input value={currentValue} onChange={changeNameHandler} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangeGroupNameHandler} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleRenameGroup} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatInfoDrawer;
