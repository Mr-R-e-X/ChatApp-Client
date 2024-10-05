import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { AppBar, Box, IconButton, Stack, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { accentColor, primaryColor, secondaryColor } from "../constants/color";
import {
  ALERT,
  CONNECT_TO_ROOM,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/event.constants";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import {
  useGetChatDetailsQuery,
  useGetUserMessagesQuery,
} from "../redux/api/api";
import { resetMessageAlert, setNewMessageAlert } from "../redux/reducers/chat";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";
import { useNavigate } from "react-router-dom";
import ChatHeader from "../components/specific/ChatHeader";
import { motion } from "framer-motion";
import ChatInfoDrawer from "./ChatInfoDrawer";

const Chat = ({ chatId, user }) => {
  const socket = getSocket();

  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isMobileMenu, currentChatMesages } = useSelector(
    (state) => state.misc
  );

  const { newMessageAlert } = useSelector((state) => state.chat);

  const bottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useGetChatDetailsQuery({
    chatId,
    populate: true,
    skip: !chatId,
  });
  const oldMessagesChunk = useGetUserMessagesQuery({ chatId, page });
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.data?.chat?.members;

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.data?.messages
  );

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { chatId, members });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIamTyping(false);
      socket.emit(STOP_TYPING, { chatId, members });
    }, 2000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessaageHandler = useCallback(
    (data) => {
      if (data?.message?.chatId !== chatId) return;
      setMessages((prev) => [...prev, data?.message]);
    },
    [chatId]
  );

  const alertHandler = useCallback(
    (data) => {
      if (data.chat !== chatId) return;
      setMessages((prev) => [...prev, data]);
      dispatch(setNewMessageAlert(chatId));
      console.log(newMessageAlert);
    },
    [chatId]
  );

  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  useEffect(() => {
    dispatch(resetMessageAlert(chatId));
    return () => {
      setMessage("");
      setMessages([]);
      setPage(1);
      setOldMessages([]);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, userTyping]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const eventHanddlers = {
    [ALERT]: alertHandler,
    [NEW_MESSAGE]: newMessaageHandler,
    [START_TYPING]: startTypingHandler,
    [STOP_TYPING]: stopTypingHandler,
  };
  useSocketEvents(socket, eventHanddlers);

  useErrors(errors);

  useEffect(() => {
    if (!members || !chatId) return;
    socket.emit(CONNECT_TO_ROOM, { chatId });
  }, [members]);

  const allMessages = [...oldMessages, ...messages];

  const handleFileMenuOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <ChatInfoDrawer />
      <motion.div
        initial={{ opacity: 0, y: "-50%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ height: "100%", width: "100%" }}
      >
        <ChatHeader chatDetails={chatDetails?.data?.data?.chat} />
        <Stack
          ref={containerRef}
          boxSizing={"border-box"}
          padding={"1rem"}
          spacing={"1rem"}
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
            minHeight: "calc(100% - 150px)",
            maxHeight: "calc(100% - 150px)",
            background: secondaryColor,
          }}
        >
          {allMessages.map((i, idx) => (
            <MessageComponent key={idx} user={user} message={i} />
          ))}
          {userTyping && <TypingLoader />}
          <div ref={bottomRef} />
        </Stack>
        <form
          style={{ height: "80px", background: secondaryColor }}
          onSubmit={submitHandler}
        >
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
                color: "black",
                paddingX: "1rem",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              ref={fileMenuRef}
              onClick={handleFileMenuOpen}
            >
              <Tooltip title="Attach File">
                <AttachFileIcon
                  sx={{
                    rotate: "10deg",
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                />
              </Tooltip>
            </IconButton>
            <InputBox
              placeholder="Type your message here..."
              sx={{ fontSize: "1.2rem", borderRadius: "20px" }}
              value={message}
              onChange={messageChangeHandler}
            />
            <IconButton
              type="submit"
              aria-label="send message"
              sx={{
                bgcolor: accentColor,
                color: "white",
                padding: "12px",
                marginLeft: "5px",
                borderRadius: "15px",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "green",
                },
              }}
            >
              <SendIcon sx={{ scale: 1.2 }} />
            </IconButton>
          </Stack>
        </form>
        <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
      </motion.div>
    </Box>
  );
};

export default AppLayout()(Chat);
