import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { executeMutation, useErrors } from "../../hooks/hooks";
import {
  useAddMemberToGroupMutation,
  useGetUserFriendsQuery,
} from "../../redux/api/api";
import {
  addCurrentGroupChatMember,
  setAddMember,
} from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const { isLoading, data, error, isError } = useGetUserFriendsQuery(chatId);

  const [addMemberInGroup, isLoadingAddMemberInGroup] = executeMutation(
    useAddMemberToGroupMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectedMemberHandler = (member) => {
    setSelectedMembers((prev) => {
      const isAlreadySelected = prev.some((m) => m._id === member._id);
      if (isAlreadySelected) {
        return prev.filter((m) => m._id !== member._id);
      } else {
        return [...prev, member];
      }
    });
  };

  const addMemberSubmitHandler = () => {
    const data = selectedMembers.map((member) => member._id);
    addMemberInGroup("Adding Members ...", {
      members: data,
      chatId,
    });
    dispatch(addCurrentGroupChatMember(selectedMembers));
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setAddMember(false));
  };
  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler} maxWidth="xs" fullWidth>
      <Stack
        p={"2rem"}
        direction={"column"}
        width={"100%"}
        spacing={"1rem"}
        sx={{ background: secondaryColor }}
      >
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Box spacing={"1rem"} sx={{ overflowY: "scroll", maxHeight: "45vh" }}>
          <List>
            {isLoading ? (
              <Skeleton />
            ) : data?.data?.friends?.length > 0 ? (
              data.data.friends.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectedMemberHandler}
                  isAdded={
                    selectedMembers.findIndex((mem) => mem._id === i._id) > -1
                      ? true
                      : false
                  }
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Available Friends</Typography>
            )}
          </List>
        </Box>
        <Stack
          my={"1rem"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMemberInGroup}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
