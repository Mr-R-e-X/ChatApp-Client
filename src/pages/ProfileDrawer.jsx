import {
  AlternateEmail as AlternateEmailIcon,
  Close as CloseIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  Email as EmailIcon,
  RememberMe as RememberMeIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { secondaryColor } from "../constants/color";
import { setIsProfileDrawerOpen } from "../redux/reducers/misc";

const ProfileDrawer = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);
  console.log(user);
  const { isProfileDrawerOpen } = useSelector((state) => state.misc);
  const imageRef = useRef(null);

  const selectRef = (ref) => {
    ref.current.click();
  };

  const handleOpen = () => {
    dispatch(setIsProfileDrawerOpen(true));
  };

  const handleClose = () => {
    dispatch(setIsProfileDrawerOpen(false));
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={isProfileDrawerOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      disableSwipeToOpen={false}
    >
      <Box
        sx={{
          padding: "1rem",
          background: secondaryColor,
          width: {
            xs: "100vw",
            sm: "70vw",
            md: "60vw",
            lg: "50vw",
          },
          maxHeight: "100%",
          minHeight: "100%",
          overflow: "hidden",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <IconButton onClick={handleClose} aria-label="close profile drawer">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Stack>
          <>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ marginTop: "2rem" }}
            >
              <Box
                sx={{
                  height: "200px",
                  width: "200px",
                  position: "relative",
                  "&:hover .icon": {
                    opacity: 1,
                  },
                  "&:hover .avatar": {
                    filter: "brightness(0.5)",
                  },
                }}
              >
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  style={{ display: "none" }}
                  ref={imageRef}
                />
                <DriveFileRenameOutlineIcon
                  className="icon"
                  sx={{
                    opacity: 0,
                    position: "absolute",
                    height: "2rem",
                    width: "2rem",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.2s ease-in-out",
                    zIndex: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => selectRef(imageRef)}
                />
                <Avatar
                  className="avatar"
                  src={user?.avatar?.url}
                  sx={{
                    height: "200px",
                    width: "200px",
                    transition: "filter 0.2s ease-in-out",
                  }}
                />
              </Box>

              <Stack
                direction={"row"}
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"center"}
                spacing={"0.3rem"}
                marginTop={"1rem"}
              >
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  {user?.name}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"center"}
                spacing={"0.3rem"}
                marginTop={"1rem"}
              >
                {/* <Typography
                variant="caption"
                color={"springgreen"}
                fontSize={"1rem"}
                sx={{ padding: "0 1rem" }}
              >
                {user?.email}
              </Typography> */}
              </Stack>

              <Box
                display="flex"
                alignItems="center"
                flexWrap={"wrap"}
                margin={"2rem 0"}
              >
                <AlternateEmailIcon
                  color="primary"
                  sx={{ marginRight: "0.5rem" }}
                />
                <Typography
                  variant="body1"
                  color={"primary"}
                  sx={{ marginRight: "1rem" }}
                >
                  {user?.username}
                </Typography>
                <EmailIcon color="success" sx={{ marginRight: "0.5rem" }} />
                <Typography variant="body1" color={"springgreen"}>
                  {user?.email}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexWrap={"wrap"}
                sx={{ marginBottom: "2rem" }}
              >
                <RememberMeIcon color="info" sx={{ marginRight: "0.5rem" }} />
                <Typography variant="body1" color={"orange"}>
                  {user?.bio}
                </Typography>
              </Box>
            </Stack>
          </>
        </Stack>
      </Box>
    </SwipeableDrawer>
  );
};

export default ProfileDrawer;
