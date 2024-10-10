/* eslint-disable react/display-name */
import { Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { primaryColor, secondaryColor } from "../../constants/color";
import {
  ACCEPTED_INCOMING_CALL,
  INCOMING_CALL,
  NEW_FRIEND,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  RECEIVE_ICE_CANDIDATE,
} from "../../constants/event.constants";
import { getUserStream } from "../../context/StreamContext";
import { showToast, useErrors, useSocketEvents } from "../../hooks/hooks";
import { getOrSaveFromStorage } from "../../lib/feature";
import ProfileDrawer from "../../pages/ProfileDrawer";
import { useUserChatsQuery } from "../../redux/api/api";
import {
  increamentNotificationsCount,
  setNewMessageAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setselectedChatInfo,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { setTypeOfCall } from "../../redux/reducers/webrtc";
import { getSocket } from "../../socket";
import PeerService from "../../webrtcUtilities/PeerService";
import InfoDialog from "../dialogs/InfoDialog";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Sidebar from "./Sidebar";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const navigate = useNavigate();
    const infoMenuAnchor = useRef(null);
    const socket = getSocket();
    const dispatch = useDispatch();
    const { isMobileMenu, chatListVisibitlityForMobie } = useSelector(
      (state) => state.misc
    );
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);
    const { userLocalStream } = getUserStream();

    const { isLoading, data, isError, error, refetch } = useUserChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);

    const handleInfoChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      dispatch(setselectedChatInfo({ chatId, groupChat }));
      infoMenuAnchor.current = e.currentTarget;
    };

    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessageAlert(data));
      },
      [chatId]
    );

    const newRequestHandler = useCallback(
      (data) => {
        dispatch(increamentNotificationsCount());
        toast.success(data);
      },
      [socket]
    );

    const friendRequestAcceptedSocketHandeler = useCallback((data) => {
      toast.success(data);
    }, []);

    const handleIncomingNotification = useCallback(
      async ({ room, offer }) => {
        if (room.hostUser !== user._id) {
          try {
            const resp = await showToast(
              `Incoming call from ${room.hostUserName}`
            );
            if (resp) {
              dispatch(setTypeOfCall("ANSWER"));
              const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
              });
              userLocalStream.current = stream;
              socket.emit(ACCEPTED_INCOMING_CALL, { room, offer });
              navigate(`/video/${room.chatId}`);
            } else {
              toast.error("Rejected");
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
      [socket]
    );
    const handleIceCandidate = useCallback(
      async ({ room, candidate, userId }) => {
        console.log(`Got candidate ${candidate}`);
        await PeerService.peer.addIceCandidate(new RTCIceCandidate(candidate));
      },
      [socket]
    );

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [NEW_FRIEND]: friendRequestAcceptedSocketHandeler,
      [INCOMING_CALL]: handleIncomingNotification,
      [RECEIVE_ICE_CANDIDATE]: handleIceCandidate,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <InfoDialog menuAnchor={infoMenuAnchor} />
        <ProfileDrawer />
        <Grid container height={"100vh"}>
          <Grid
            item
            sm={1}
            lg={0.5}
            sx={{
              backgroundColor: secondaryColor,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            height={"100%"}
            sx={{
              display: {
                xs: chatListVisibitlityForMobie ? 12 : "none",
                sm: "block",
              },
            }}
          >
            {isLoading ? (
              [...Array(10)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  animation="wave"
                  height={"100px"}
                  sm={4}
                  md={3}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                />
              ))
            ) : (
              <ChatList
                chats={data?.data?.chats}
                chatId={chatId}
                newMessagesAlert={newMessageAlert}
                onlineUsers={["1", "4"]}
                handleInfoChat={handleInfoChat}
              />
            )}
          </Grid>
          <Grid
            item
            sm={7}
            lg={7.5}
            sx={{
              display: {
                xs: chatListVisibitlityForMobie ? "none" : 12,
                sm: "block",
              },
              background: primaryColor,
              width: "100%",
            }}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
