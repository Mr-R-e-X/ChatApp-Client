import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import "../../../public/vite.svg";
import MobileInfoOptions from "../dialogs/MobileInfoOptions";
import ChatItem from "../shared/ChatItem";
import { setSmallScreenOptions } from "../../redux/reducers/misc";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleInfoChat,
}) => {
  const dispatch = useDispatch();
  const mobileRef = useRef();
  const handleMobileOptions = (e) => {
    mobileRef.current = e.currentTarget;
    dispatch(setSmallScreenOptions(true));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MobileInfoOptions anchor={mobileRef} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
          width: "100%",
          gap: "5px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"5px"}
          paddingLeft={"1rem"}
        >
          <img
            src="/vite.svg"
            alt="logo"
            style={{ width: "35px", height: "35px" }}
          />
          <Typography variant="h5" color="white">
            Chatterly
          </Typography>
        </Stack>
        <Box
          sx={{ display: { xs: "block", sm: "none" }, marginRight: "1rem" }}
          onClick={handleMobileOptions}
          ref={mobileRef}
        >
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {chats?.map((data, index) => {
          const { avatar = [], name, _id, groupChat, members } = data;
          const newMessageAlert = newMessagesAlert.find(
            ({ chatId: chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          return (
            <ChatItem
              key={_id}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              index={index}
              groupChat={groupChat}
              sameSender={chatId == _id}
              handleInfoChat={handleInfoChat}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatList;
