import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import {
  bgGradient,
  bgGradient1,
  bgGradientColor3,
  grayColor,
  orange,
} from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessages } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "123",
  name: "John Doe",
};

const Chat = () => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "calc(100% - 75px)",
          background: bgGradient,
        }}
      >
        {sampleMessages.map((i, idx) => (
          <MessageComponent key={idx} user={user} message={i} />
        ))}
      </Stack>
      <form style={{ height: "75px", background: bgGradient1 }}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              color: "black",
              padding: "0.6rem",
              borderRadius: "0",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: orange,
                color: "white",
              },
            }}
            ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder="Type your message here..." />
          <IconButton
            type="submit"
            aria-label="send message"
            sx={{
              bgcolor: orange,
              color: "white",
              padding: "0.6rem",
              borderRadius: "0",
              transition: "background-color 0.2s ease-in-out",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
