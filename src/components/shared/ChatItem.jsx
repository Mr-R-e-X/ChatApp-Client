import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
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
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: 0 }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: "1rem",
          backgroundColor: sameSender ? "rgba(255, 255, 255, 0.3)" : "unset",
          cursor: "pointer",
          position: "relative",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography sx={{ textDecoration: "none", fontWeight: "600" }}>
            {name}
          </Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Messages</Typography>
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
      </div>
    </Link>
  );
};

export default memo(ChatItem);
