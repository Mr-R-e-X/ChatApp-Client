import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { server } from "../constants/config";
import api from "../redux/api/api";
import { userNotExists } from "../redux/reducers/auth";
import { resetNotificationsCount } from "../redux/reducers/chat";
import { setIsMobileMenu, setIsNotifiaction } from "../redux/reducers/misc";
import toast, { Toaster } from "react-hot-toast";
import { Box, Button, Typography } from "@mui/material";
import { accentColor } from "../constants/color";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) return fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

const executeMutation = (mutationHook) => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating Data...");
    try {
      const response = await mutate(...args);
      if (response.data) {
        toast.success(
          response?.data?.data?.message || "Updated Successfully..!!",
          {
            id: toastId,
          }
        );
        setData(response.data);
      } else {
        toast.error(response?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      setData(null);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutation, isloading, data];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    if (!socket) {
      return;
    }

    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

const openNotifications = (dispatch) => {
  dispatch(setIsNotifiaction(true));
  dispatch(resetNotificationsCount());
};

const logoutHandler = async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/api/user/logout`, {
      withCredentials: true,
    });
    dispatch(userNotExists());
    dispatch(api.util.resetApiState());
    toast.success(data.data.message);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Something Went Wrong ...!!");
  }
};

const useDetectSmallScreen = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    console.log("Small screen detection:", isSmallScreen);
    if (isSmallScreen) {
      dispatch(setIsMobileMenu(true));
    } else {
      dispatch(setIsMobileMenu(false));
    }
  }, [isSmallScreen, dispatch]);

  return isSmallScreen;
};

const showToast = (message) => {
  return new Promise((resolve, reject) => {
    const customToastId = "custom-toast";

    toast.custom(
      (t) => (
        <Box
          sx={{
            backgroundColor: accentColor,
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="inherit" gutterBottom>
            {message}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: "10px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                resolve(true);
                toast.remove(customToastId);
              }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                resolve(false);
                toast.remove(customToastId);
              }}
            >
              Reject
            </Button>
          </Box>
        </Box>
      ),
      { id: customToastId, duration: Infinity }
    );
  });
};

export {
  executeMutation,
  logoutHandler,
  openNotifications,
  useErrors,
  useSocketEvents,
  useDetectSmallScreen,
  showToast,
};
