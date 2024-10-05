import {
  AlternateEmail as AlternateEmailIcon,
  Email as EmailIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupCretatorOptions } from "../../redux/reducers/misc";
import GroupOptions from "../dialogs/GroupOptions";
import { primaryColor } from "../../constants/color";
const UserListPage = ({
  members = [],
  admins = [],
  creator = "",
  currentUser = "",
  chatId = "",
}) => {
  const { groupCretatorOptions } = useSelector((state) => state.misc);
  const userListRef = useRef(null);
  const [clickedUserAnchor, setClickedUserAnchor] = useState(null);
  const [currentSelectedUser, setCurrentSelectedUser] = useState("");
  const dispatch = useDispatch();
  const openGroupMemberOptions = (e, id) => {
    dispatch(setGroupCretatorOptions(true));
    setClickedUserAnchor(e.currentTarget);
    setCurrentSelectedUser(id);
  };
  const isCurrentUserCreator = currentUser === creator;
  return (
    <Stack width={"100%"} sx={{ height: "58vh", overflowY: "scroll" }}>
      <List>
        {members.map((member, idx) => {
          const isAdmin = admins.includes(member._id.toString());
          const isCreator = member._id.toString() === creator;
          const isCurrentUser =
            member._id.toString() === currentUser.toString();
          return (
            <ListItem
              key={member._id}
              sx={{
                padding: "0.5rem",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                width: "100%",
                order: isCurrentUser ? 0 : "unset",
              }}
            >
              <Stack
                display={"flex"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={"1rem"}
                sx={{
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  padding: "0.5rem 1rem",
                  borderRadius: "10px",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: primaryColor,
                    color: "white",
                  },
                }}
              >
                <Avatar
                  src={member.avatar.url}
                  sx={{ height: "4rem", width: "4rem", marginX: "0.5rem" }}
                />
                <Stack
                  sx={{
                    position: "relative",
                    flexGrow: 1,
                  }}
                >
                  {isCurrentUser ? (
                    <Typography variant={"h6"}>You</Typography>
                  ) : (
                    <div>
                      <Typography variant={"h6"}> {member.name} </Typography>
                      <Box display="flex" alignItems="center" flexWrap={"wrap"}>
                        <AlternateEmailIcon
                          color="primary"
                          sx={{ marginRight: "0.5rem" }}
                        />
                        <Typography
                          variant="caption"
                          color={"primary"}
                          sx={{ marginRight: "1rem" }}
                        >
                          {member.username}
                        </Typography>
                        <EmailIcon
                          color="success"
                          sx={{ marginRight: "0.5rem" }}
                        />
                        <Typography variant="caption" color={"springgreen"}>
                          {member.email}
                        </Typography>
                      </Box>
                    </div>
                  )}
                </Stack>

                {isAdmin && (
                  <Typography
                    color="green"
                    sx={{
                      background: "green",
                      padding: "0.5rem 0.5rem",
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    Admin
                  </Typography>
                )}
                {isCreator && (
                  <Typography
                    sx={{
                      background: "red",
                      padding: "0.5rem 0.5rem",
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    Creator
                  </Typography>
                )}

                {!isCurrentUser &&
                  (isCurrentUserCreator ? (
                    <IconButton
                      ref={userListRef}
                      onClick={(e) => openGroupMemberOptions(e, member._id)}
                    >
                      <MoreVertIcon color="info" />
                    </IconButton>
                  ) : (
                    admins.includes(currentUser.toString()) &&
                    !isAdmin &&
                    !isCreator && (
                      <IconButton
                        ref={userListRef}
                        onClick={(e) => openGroupMemberOptions(e, member._id)}
                      >
                        <MoreVertIcon color="info" />
                      </IconButton>
                    )
                  ))}
              </Stack>

              <GroupOptions
                chatId={chatId}
                memberId={currentSelectedUser}
                anchorRef={clickedUserAnchor}
                creator={creator}
                isCurrentUserAdmin={admins.includes(currentUser.toString())}
                clickedUserIsAdmin={admins.includes(
                  currentSelectedUser.toString()
                )}
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default UserListPage;
