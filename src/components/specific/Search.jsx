import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useInputValidation } from "6pp";

const Search = () => {
  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (id) => {
    console.log(id);
  };

  return (
    <Dialog open maxWidth={"xs"} fullWidth>
      <Stack p={"2rem"} direction={"column"} width={"100%"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i, idx) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
