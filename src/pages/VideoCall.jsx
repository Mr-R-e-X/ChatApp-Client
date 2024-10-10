import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "../socket";
import { getUserStream } from "../context/StreamContext";
import PeerService from "../webrtcUtilities/PeerService";
import {
  ACCEPTED_INCOMING_CALL,
  CALL_ACCEPTED,
  ICE_CANDIDATE,
  RTC_FINAL_NEGOTIATION,
  RTC_NEGOTIATION,
  RTC_NEGOTIATION_DONE,
  RTC_NEGOTIATION_NEEDED,
  START_NEW_CALL,
} from "../constants/event.constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSocketEvents } from "../hooks/hooks";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import {
  AppBar,
  Avatar,
  Box,
  Fab,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  CallEnd,
  Mic,
  MicOff,
  MoreVert,
  ScreenShare,
  Videocam,
  VideocamOff,
} from "@mui/icons-material";

const VideoCall = () => {
  const socket = getSocket();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { typeOfCall } = useSelector((state) => state.webrtc);
  const peersRef = useRef(null);
  const [remoteStream, setRemoteStream] = useState(new Map());
  const [remoteStreams, setRemoteStreams] = useState([]);
  const { userLocalStream } = getUserStream();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const addedTracks = new Set();

  useEffect(() => {
    if (userLocalStream.current) {
      const initiateCall = async () => {
        //PeerService.peer.ontrack = (event) => {};
        const offer = await PeerService.createOffer();
        socket.emit(START_NEW_CALL, {
          room: { chatId, hostUser: user._id, hostUserName: user.username },
          offer,
        });
        PeerService.peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit(ICE_CANDIDATE, {
              room: { chatId },
              candidate: event.candidate,
              userId: user._id,
            });
          }
        };
      };
      initiateCall();
    } else {
      navigate("/");
    }

    return () => {
      if (userLocalStream.current) {
        userLocalStream.current.getTracks().forEach((track) => track.stop());
        console.log("Cleaned up local media stream");
      }
    };
  }, [socket, userLocalStream, typeOfCall]);

  const handleIncomingCall = useCallback(async ({ room, offer }) => {
    const answer = await PeerService.createAnswer(offer);
    socket.emit(CALL_ACCEPTED, { room, answer });
  }, []);

  const sendStreams = useCallback(async () => {
    if (userLocalStream.current) {
      for (const track of userLocalStream.current.getTracks()) {
        if (!addedTracks.has(track.id)) {
          PeerService.peer.addTrack(track, userLocalStream.current);
          addedTracks.add(track.id);
        }
      }
    }
  }, []);

  const handleCallAccepted = useCallback(async ({ room, answer }) => {
    if (typeOfCall === "ANSWER") {
      console.log(answer);
      await PeerService.setLocalDescription(answer);
      console.log("Call Accepted");
      sendStreams();
    }
  }, []);

  const handleNeededNegotiation = useCallback(async () => {
    console.log("NEGOTIATION EVENT LISTENER");
    const offer = await PeerService.createOffer();
    console.log("Needed Negotiation");
    socket.emit(RTC_NEGOTIATION_NEEDED, {
      room: { chatId, hostUser: user._id, hostUserName: user.username },
      offerNego: offer,
    });
  }, []);

  useEffect(() => {
    PeerService.peer.addEventListener(
      "negotiationneeded",
      handleNeededNegotiation
    );

    return () => {
      PeerService.peer.removeEventListener(
        "negotiationneeded",
        handleNeededNegotiation
      );
      console.log("Cleaned up negotiationneeded event listener");
    };
  }, [socket]);

  const handleRtcNegotiation = useCallback(async ({ room, offer }) => {
    const answer = await PeerService.createAnswer(offer);
    console.log("RTC_NEGOTIATION_DONE");
    socket.emit(RTC_NEGOTIATION_DONE, { room, answer });
    sendStreams();
  }, []);

  const handleRtcFinalNegotiation = useCallback(async ({ room, answer }) => {
    await PeerService.setLocalDescription(answer);
    sendStreams();
  }, []);

  useEffect(() => {
    const handleTrackEvent = async (e) => {
      const remoteStream = e.streams[0];
      setRemoteStream((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.set(user._id, remoteStream);
        return newMap;
      });
    };

    PeerService.peer.addEventListener("track", handleTrackEvent);

    return () => {
      PeerService.peer.removeEventListener("track", handleTrackEvent);
      console.log("Cleaned up track event listener");
    };
  }, [remoteStream]);

  const eventHandler = {
    [ACCEPTED_INCOMING_CALL]: handleIncomingCall,
    [CALL_ACCEPTED]: handleCallAccepted,
    [RTC_NEGOTIATION]: handleRtcNegotiation,
    [RTC_FINAL_NEGOTIATION]: handleRtcFinalNegotiation,
  };

  useSocketEvents(socket, eventHandler);

  const stopStream = (stream) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      console.log("Stream stopped");
    }
  };

  const endCall = () => {
    if (PeerService.peer) {
      PeerService.peer.close();
    }
    stopStream(userLocalStream.current);
    stopStream(remoteStream.get(user._id));
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#121212",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid container sx={{ padding: 2, justifyContent: "center" }} spacing={2}>
        {/* Remote Streams */}
        {Array.from(remoteStream).map(([userId, stream]) => (
          <Grid item xs={12} sm={6} md={4} key={userId}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                bgcolor: "#1e1e1e",
              }}
            >
              <ReactPlayer
                playing
                muted
                height={"100%"}
                width={"100%"}
                url={stream}
              />
            </Box>
          </Grid>
        ))}

        {/* User Local Stream */}
        {userLocalStream && (
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                bgcolor: "#1e1e1e",
              }}
            >
              <ReactPlayer
                playing
                // muted={!isCameraOn}
                muted
                height={"100%"}
                width={"100%"}
                url={userLocalStream.current}
              />
              <Avatar
                sx={{ position: "absolute", bottom: 8, left: 8 }}
                src={`https://ui-avatars.com/api/?name=${user.username}`}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Floating Controls - Mute, Video, Screen Share, End Call */}
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
        }}
      >
        <Fab
          color={isMuted ? "secondary" : "primary"}
          onClick={() => setIsMuted(!isMuted)}
          sx={{ bgcolor: isMuted ? "#f44336" : "#3f51b5" }}
        >
          {isMuted ? (
            <MicOff sx={{ color: "#ffffff" }} />
          ) : (
            <Mic sx={{ color: "#ffffff" }} />
          )}
        </Fab>

        <Fab
          color={isCameraOn ? "primary" : "secondary"}
          onClick={() => setIsCameraOn(!isCameraOn)}
          sx={{ bgcolor: isCameraOn ? "#3f51b5" : "#f44336" }}
        >
          {isCameraOn ? (
            <Videocam sx={{ color: "#ffffff" }} />
          ) : (
            <VideocamOff sx={{ color: "#ffffff" }} />
          )}
        </Fab>

        <Fab
          color={isScreenSharing ? "primary" : "default"}
          onClick={() => {
            setIsScreenSharing(!isScreenSharing);
          }}
          sx={{ bgcolor: isScreenSharing ? "#3f51b5" : "#9e9e9e" }}
        >
          <ScreenShare sx={{ color: "#ffffff" }} />
        </Fab>

        <Fab color="error" onClick={endCall} sx={{ bgcolor: "#f44336" }}>
          <CallEnd sx={{ color: "#ffffff" }} />
        </Fab>
      </Box>
    </Box>
  );
};

export default VideoCall;
