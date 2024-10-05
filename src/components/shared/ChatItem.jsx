import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { neutralColor } from "../../constants/color";
import {
  setChatListVisibilityForMobile,
  setIsMobileMenu,
  setselectedChatInfo,
} from "../../redux/reducers/misc";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar,
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleInfoChat,
}) => {
  const dispatch = useDispatch();

  const handleContextMenu = (e) => {
    e.preventDefault();
    handleInfoChat(e, _id, groupChat);
  };

  const handleMobileView = (e) => {
    dispatch(setIsMobileMenu(false));
    dispatch(setChatListVisibilityForMobile(false));
    dispatch(setselectedChatInfo({ chatId: _id, groupChat }));
  };

  return (
    <Link
      sx={{ padding: 0 }}
      to={`/chat/${_id}`}
      onContextMenu={handleContextMenu}
      onClick={handleMobileView}
    >
      <motion.div
        initial={{ opacity: 0, y: "-50%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: "1rem",
          backgroundColor: sameSender ? "rgba(255, 255, 255, 0.3)" : "unset",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleMobileView}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography
            variant="body1"
            sx={{ textDecoration: "none", fontWeight: "400" }}
          >
            {groupChat ? name : name.username}
          </Typography>
          {!groupChat && (
            <Typography variant="caption" color={neutralColor}>
              {" "}
              {name.name}{" "}
            </Typography>
          )}
          {newMessageAlert && (
            <Typography variant="caption" color={"orange"} fontWeight={"500"}>
              {newMessageAlert.count} New Messages
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "lightgreen",
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
              transform: "scale(1)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
