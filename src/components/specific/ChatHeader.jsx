import {
  MoreVert as MoreVertIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";
import { AppBar, IconButton, Typography } from "@mui/material";
import React, { useRef } from "react";
import { accentColor, secondaryColor } from "../../constants/color";
import { AvatarChatInfoCard } from "../shared/AvatarCard";
import { useDispatch } from "react-redux";
import {
  setChatListVisibilityForMobile,
  setIsChatOptionsOpen,
} from "../../redux/reducers/misc";
import ChatHeaderOptions from "../dialogs/ChatHeaderOptions";

const ChatHeader = ({ chatDetails }) => {
  if (!chatDetails) return null;
  const dispatch = useDispatch();
  const chatOptionsRef = useRef(null);

  const { name, groupChat, _id } = chatDetails;

  const handleChatListView = () => {
    dispatch(setChatListVisibilityForMobile(true));
  };
  const openChatOptions = (e) => {
    chatOptionsRef.current = e.currentTarget;
    dispatch(setIsChatOptionsOpen(true));
  };

  return (
    <>
      <ChatHeaderOptions anchor={chatOptionsRef} chatId={_id} />
      <AppBar
        position="static"
        sx={{
          background: secondaryColor,
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: "1rem 0.5rem",
          alignItems: "center",
          zIndex: 3,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <IconButton
          sx={{
            display: { xs: "block", sm: "none" },
            bgcolor: "inherit",
            color: "white",
            transition: "all 0.2s ease-in-out",
            marginRight: "1rem",
            "&:hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          onClick={handleChatListView}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        {groupChat ? (
          <AvatarChatInfoCard
            avatar={chatDetails?.avatar}
            height={"50px"}
            width={"50px"}
          />
        ) : (
          <AvatarChatInfoCard
            avatar={chatDetails?.members[0].avatar}
            height={"50px"}
            width={"50px"}
          />
        )}
        {groupChat ? (
          <Typography
            variant="p"
            component="div"
            sx={{ flexGrow: 1, fontSize: "1.2rem" }}
          >
            {name}
          </Typography>
        ) : (
          <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
            {chatDetails?.members[0].name}
          </Typography>
        )}

        <IconButton color="inherit" onClick={openChatOptions}>
          <MoreVertIcon />
        </IconButton>
      </AppBar>
    </>
  );
};

export default ChatHeader;
