import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { executeMutation } from "../../hooks/hooks";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import { secondaryColor } from "../../constants/color";

const Search = () => {
  const [searchUser] = useLazySearchUserQuery();

  const search = useInputValidation("");
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);

  const [users, setUsers] = useState([]);

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data?.data?.users))
        .catch((err) => console.log(err));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search.value]);

  const [sendFriendRequest, isLoadingSendFriendRequest] = executeMutation(
    useSendFriendRequestMutation
  );
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request ...!!!", {
      receiver: id,
    });
  };

  return (
    <Dialog
      open={isSearch}
      maxWidth={"xs"}
      fullWidth
      onClose={searchCloseHandler}
    >
      <Stack
        p={"2rem"}
        direction={"column"}
        width={"100%"}
        spacing={"1rem"}
        sx={{ background: secondaryColor }}
      >
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
        <Box sx={{ overflowY: "scroll" }} maxHeight={"65vh"}>
          <List>
            {users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handelerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
          </List>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default Search;
