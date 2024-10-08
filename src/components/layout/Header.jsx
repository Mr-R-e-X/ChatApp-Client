import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Message,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { primaryColor } from "../../constants/color";
import { server } from "../../constants/config";
import api from "../../redux/api/api";
import { userNotExists } from "../../redux/reducers/auth";
import { resetNotificationsCount } from "../../redux/reducers/chat";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsNotifiaction,
  setIsSearch,
} from "../../redux/reducers/misc";

const SearchDialog = lazy(() => import("../specific/Search"));

const NotificationsDialog = lazy(() => import("../specific/Notifications"));

const NewGroupsDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationsCount } = useSelector((state) => state.chat);
  console.log(notificationsCount);
  const dispatch = useDispatch();
  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
  };
  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const navigateToGroup = () => navigate("/group");
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      dispatch(api.util.resetApiState());
      toast.success(data.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong ...!!"
      );
    }
  };
  const openNotifications = () => {
    dispatch(setIsNotifiaction(true));
    dispatch(resetNotificationsCount());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            background: primaryColor,
          }}
        >
          <Toolbar>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                variant="h6"
                color={"green"}
                sx={{
                  display: { xs: "none", sm: "block" },
                  cursor: "pointer",
                  fontWeight: "900",
                }}
              >
                Chatterly
                <Message />
              </Typography>
            </Stack>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconBtn
                title={"Menu"}
                icon={<MenuIcon />}
                clickFunc={handleMobile}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                clickFunc={openSearchDialog}
              />
              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                clickFunc={openNewGroup}
              />
              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                clickFunc={navigateToGroup}
              />
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                clickFunc={openNotifications}
                value={notificationsCount}
              />
              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                clickFunc={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupsDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, clickFunc, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={clickFunc}>
        {value ? (
          <Badge badgeContent={value} color="secondary">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
