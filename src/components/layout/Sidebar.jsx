import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler, openNotifications } from "../../hooks/hooks";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsProfileDrawerOpen,
  setIsSearch,
} from "../../redux/reducers/misc";

const SearchDialog = lazy(() => import("../specific/Search"));

const NotificationsDialog = lazy(() => import("../specific/Notifications"));

const NewGroupsDialog = lazy(() => import("../specific/NewGroups"));

const Sidebar = () => {
  const navigate = useNavigate();
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationsCount } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
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

  return (
    <>
      <Box height={"100vh"} width={"100%"} overflow={"hidden"}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100vh",
              gap: "1rem",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: "1rem",
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconBtn
                title={"Menu"}
                icon={<MenuIcon />}
                clickFunc={handleMobile}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                clickFunc={openSearchDialog}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                clickFunc={openNewGroup}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                clickFunc={navigateToGroup}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                clickFunc={() => openNotifications(dispatch)}
                value={notificationsCount}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                clickFunc={() => logoutHandler(dispatch)}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box
              sx={{
                width: "100%",
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Toolbar>
                <Tooltip title="Profile">
                  <Avatar
                    src={user?.avatar.url}
                    sx={{ cursor: "pointer" }}
                    onClick={() => dispatch(setIsProfileDrawerOpen(true))}
                  />
                </Tooltip>
              </Toolbar>
            </Box>
          </Box>
        </Toolbar>
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

export default Sidebar;
