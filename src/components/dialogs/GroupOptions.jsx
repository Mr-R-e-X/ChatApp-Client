import {
  AssignmentInd as AssignmentIndIcon,
  GroupRemove as GroupRemoveIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  List,
  ListItem,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupCretatorOptions,
  updateCurrentGroupChatAdmins,
  updateCurrentGroupChatCreator,
  updateCurrentGroupChatMembers,
} from "../../redux/reducers/misc";
import { executeMutation } from "../../hooks/hooks";
import {
  useAssignGroupAdminMutation,
  useAssignGroupCreatorMutation,
  useRemoveMemberFromGroupMutation,
} from "../../redux/api/api";

const GroupOptions = ({
  chatId,
  memberId,
  anchorRef,
  creator,
  isCurrentUserAdmin,
  clickedUserIsAdmin,
}) => {
  const { groupCretatorOptions } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleOptionsClose = () => {
    dispatch(setGroupCretatorOptions(false));
  };

  const [openLoader, setOpenLoader] = useState(false);

  const [assignGroupCreator, isAssignGroupCreatorLoading] = executeMutation(
    useAssignGroupCreatorMutation
  );
  const [assignGroupAdmin, isAssignGroupAdminLoading] = executeMutation(
    useAssignGroupAdminMutation
  );
  const [removeMember, isRemoveMemberLoading] = executeMutation(
    useRemoveMemberFromGroupMutation
  );

  const openBackdrop = () => setOpenLoader(true);
  const closeBackdrop = () => setOpenLoader(false);

  const handleAssignCreator = () => {
    openBackdrop();
    assignGroupCreator("Changing Creator of the group", {
      userId: memberId,
      chatId: chatId,
    });
    dispatch(updateCurrentGroupChatCreator(memberId));
    closeBackdrop();
    handleOptionsClose();
  };

  const handleAssignAdmin = () => {
    openBackdrop();
    assignGroupAdmin("Making Admin of the group", {
      userId: memberId,
      chatId: chatId,
    });
    dispatch(updateCurrentGroupChatAdmins(memberId));
    closeBackdrop();
    handleOptionsClose();
  };

  const handleRemoveMember = () => {
    openBackdrop();
    removeMember("Removing member from the group", {
      userId: memberId,
      chatId: chatId,
    });
    dispatch(updateCurrentGroupChatMembers(memberId));
    closeBackdrop();
    handleOptionsClose();
  };

  let isCurrentUserCreator = creator === user._id.toString();
  return (
    <Menu
      open={groupCretatorOptions}
      anchorEl={anchorRef}
      onClose={handleOptionsClose}
    >
      <div style={{ width: "max-content" }}>
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {isCurrentUserCreator && (
            <ListItem sx={{ flexGrow: 1 }}>
              <Button
                size="small"
                color="warning"
                sx={{ width: "100%" }}
                onClick={handleAssignCreator}
              >
                <AssignmentIndIcon
                  size="small"
                  sx={{ marginRight: "0.3rem" }}
                />
                Assign Creator
              </Button>
            </ListItem>
          )}
          {isCurrentUserCreator && !clickedUserIsAdmin && (
            <ListItem sx={{ flexGrow: 1 }}>
              <Button
                size="small"
                color="info"
                sx={{ width: "100%" }}
                onClick={handleAssignAdmin}
              >
                <SupervisorAccountIcon
                  size="small"
                  sx={{ marginRight: "0.3rem" }}
                />
                Assign Admin
              </Button>
            </ListItem>
          )}
          {isCurrentUserCreator && (
            <ListItem sx={{ flexGrow: 1 }}>
              <Button
                size="small"
                color="error"
                sx={{ width: "100%" }}
                onClick={handleRemoveMember}
              >
                <GroupRemoveIcon size="small" sx={{ marginRight: "0.5rem" }} />
                Kick Out
              </Button>
            </ListItem>
          )}
          {isCurrentUserAdmin && !clickedUserIsAdmin && (
            <>
              <ListItem sx={{ flexGrow: 1 }}>
                <Button
                  size="small"
                  color="info"
                  sx={{ width: "100%" }}
                  onClick={handleAssignAdmin}
                >
                  <SupervisorAccountIcon
                    size="small"
                    sx={{ marginRight: "0.3rem" }}
                  />
                  Assign Admin
                </Button>
              </ListItem>
              <ListItem sx={{ flexGrow: 1 }}>
                <Button
                  size="small"
                  color="error"
                  sx={{ width: "100%" }}
                  onClick={handleRemoveMember}
                >
                  <GroupRemoveIcon
                    size="small"
                    sx={{ marginRight: "0.5rem" }}
                  />
                  Kick Out
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </div>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Menu>
  );
};

export default GroupOptions;
