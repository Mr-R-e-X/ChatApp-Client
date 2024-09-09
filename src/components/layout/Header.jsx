import React, { Suspense, useState, lazy } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Backdrop,
} from "@mui/material";
import { IconButton } from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { bgGradientColor3 } from "../../constants/color";
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specific/Search"));

const NotificationsDialog = lazy(() => import("../specific/Notifications"));

const NewGroupsDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const navigateToGroup = () => navigate("/group");
  const logoutHandler = () => {
    console.log("Logout Handler");
  };
  const openNotifications = () => {
    setIsNotification((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            background: bgGradientColor3,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              Chat App
            </Typography>
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

const IconBtn = ({ title, icon, clickFunc }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={clickFunc}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
