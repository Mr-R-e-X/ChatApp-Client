import {
  ExitToApp as ExitToAppIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Button,
  List,
  ListItem,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsDeleteMenu, setRightDrawerOpen } from "../../redux/reducers/misc";
import { executeMutation } from "../../hooks/hooks";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";
import { useNavigate } from "react-router-dom";
const ConfirmDeleteDialog = lazy(() => import("./ConfirmDeleteDialog"));
const InfoDialog = ({ menuAnchor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isDeleteMenu,
    isRightDrawerOpen,
    selectedDeleteChat,
    selectedChatInfo,
  } = useSelector((state) => state.misc);

  const [confirmDeletDialog, setConfirmDeleteDialog] = useState(false);
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    menuAnchor.current = null;
  };

  const openRightDrawerHandler = () => {
    dispatch(setRightDrawerOpen(true));
    closeHandler();
  };

  const [deleteChat, _, deleteChatData] = executeMutation(
    useDeleteChatMutation
  );
  const [leaveGroup, __, leaveGroupData] = executeMutation(
    useLeaveGroupMutation
  );

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting the chat", { id: selectedDeleteChat.chatId });
    closeConfirmDeleteHandler();
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving the group", { id: selectedDeleteChat.chatId });
    closeConfirmDeleteHandler();
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) return navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={menuAnchor.current}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack>
        <List sx={{ width: "max-content" }}>
          <ListItem
            sx={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
            onClick={openRightDrawerHandler}
          >
            <Button variant="contained" color={"warning"}>
              <InfoIcon />
              <Typography sx={{ padding: "0 0.5rem" }}>About</Typography>
            </Button>
          </ListItem>
          <ListItem
            sx={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            {selectedDeleteChat.groupChat ? (
              <Button
                variant="contained"
                color={"error"}
                onClick={openConfirmDeleteHandler}
              >
                <ExitToAppIcon />
                <Typography sx={{ padding: "0 0.5rem" }}>Leave</Typography>
              </Button>
            ) : (
              <Button
                variant="contained"
                color={"error"}
                onClick={openConfirmDeleteHandler}
              >
                <ExitToAppIcon />
                <Typography sx={{ padding: "0 0.5rem" }}>Delete</Typography>
              </Button>
            )}
          </ListItem>
        </List>
      </Stack>
      {confirmDeletDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeletDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={
              !selectedDeleteChat.groupChat
                ? deleteChatHandler
                : leaveGroupHandler
            }
          />
        </Suspense>
      )}
    </Menu>
  );
};

export default InfoDialog;
