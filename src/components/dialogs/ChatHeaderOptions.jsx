import {
  Call as CallIcon,
  Info as InfoIcon,
  VideoCall as VideoCallIcon,
} from "@mui/icons-material";
import { Button, List, ListItem, Menu, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsChatOptionsOpen,
  setRightDrawerOpen,
} from "../../redux/reducers/misc";

import { useNavigate } from "react-router-dom";
import { getSocket } from "../../socket";
import { getUserStream } from "../../context/StreamContext";
import { setTypeOfCall } from "../../redux/reducers/webrtc";

const ChatHeaderOptions = ({ anchor, chatId }) => {
  const socket = getSocket();
  const navigate = useNavigate();
  const { isChatOptionsOpen } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { setUserLocalStream } = getUserStream();
  const [mediaEnabled, setMediaEnabled] = useState(false);

  const closeHandler = () => {
    dispatch(setIsChatOptionsOpen(false));
  };
  const openRightDrawerHandler = () => {
    dispatch(setRightDrawerOpen(true));
    closeHandler();
  };

  const handleVideoCall = async () => {
    closeHandler();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    if (stream) {
      setUserLocalStream(stream);
      setMediaEnabled(true);
      dispatch(setTypeOfCall("OFFER"));
    }
  };
  useEffect(() => {
    if (mediaEnabled) {
      navigate(`/video/${chatId}`);
    }
  });

  return (
    <Menu
      open={isChatOptionsOpen}
      onClose={closeHandler}
      anchorEl={anchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      sx={{ padding: 0 }}
    >
      <Stack direction={"column"} sx={{ width: "maxContent" }}>
        <List sx={{ padding: "0.3rem" }}>
          <ListItem sx={{ padding: "0.3rem 0" }}>
            <Button
              color="success"
              sx={{ width: "100%" }}
              onClick={handleVideoCall}
            >
              <VideoCallIcon sx={{ marginRight: "0.5rem" }} /> Video
            </Button>
          </ListItem>

          <ListItem sx={{ padding: "0.3rem 0" }}>
            <Button color="success" sx={{ width: "100%" }}>
              <CallIcon sx={{ marginRight: "0.5rem" }} /> Audio
            </Button>
          </ListItem>
          <ListItem sx={{ padding: "0.3rem 0" }}>
            <Button
              color="warning"
              sx={{ width: "100%" }}
              onClick={openRightDrawerHandler}
            >
              <InfoIcon sx={{ marginRight: "0.5rem" }} /> About
            </Button>
          </ListItem>
        </List>
      </Stack>
    </Menu>
  );
};

export default ChatHeaderOptions;
