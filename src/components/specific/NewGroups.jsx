import { useInputValidation } from "6pp";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { secondaryColor } from "../../constants/color";
import { executeMutation, useErrors } from "../../hooks/hooks";
import {
  useCreateNewGroupMutation,
  useGetUserFriendsQuery,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const NewGroups = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useGetUserFriendsQuery();
  const [newGroup, isLoadingNewGroup] = executeMutation(
    useCreateNewGroupMutation
  );

  // console.log(data);

  const errors = [{ isError, error }];
  useErrors(errors);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupName = useInputValidation("");

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

  const submitHandler = () => {
    if (!groupName.value)
      return toast.error("Can't create a group without a group name");
    if (selectedMembers.length < 2)
      return toast.error("Please select atleast two members");

    const members = selectedMembers.map((member) => member._id);
    newGroup(`Creating ${groupName.value}`, {
      name: groupName.value,
      members,
    });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} maxWidth={"xs"} fullWidth onClose={closeHandler}>
      <Stack
        p={"2rem"}
        direction={"column"}
        width={"100%"}
        spacing={"1rem"}
        sx={{ background: secondaryColor }}
      >
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Box sx={{ overflowY: "scroll" }} maxHeight={"65vh"}>
          <Stack width={"100%"}>
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.data?.friends.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={selectedMemberHandler}
                  isAdded={
                    selectedMembers.findIndex((mem) => mem._id === i._id) > -1
                      ? true
                      : false
                  }
                />
              ))
            )}
          </Stack>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          sx={{
            position: "relative",
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              margin: "0.4rem",
            }}
            color="error"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              margin: "0.4rem",
            }}
            color="success"
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
