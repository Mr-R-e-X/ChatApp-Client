import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { bgGradient } from "../../constants/color";
const NewGroups = () => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupName = useInputValidation("");
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElem) => currElem != id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    console.log(selectedMembers);
  }, [selectedMembers]);
  const submitHandler = () => {};
  const closeHandler = () => {};
  return (
    <Dialog open maxWidth={"xs"} fullWidth>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={"100%"}
        spacing={"1rem"}
        sx={{ background: bgGradient }}
      >
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack width={"100%"}>
          {members.map((i, idx) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>
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
