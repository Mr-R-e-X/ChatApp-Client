import {
  Add as AddIcon,
  Group as GroupIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Backdrop, Button, List, ListItem, Menu, Stack } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsProfileDrawerOpen,
  setIsSearch,
  setSmallScreenOptions,
} from "../../redux/reducers/misc";
import { logoutHandler, openNotifications } from "../../hooks/hooks";

const SearchDialog = lazy(() => import("../specific/Search"));

const NotificationsDialog = lazy(() => import("../specific/Notifications"));

const NewGroupsDialog = lazy(() => import("../specific/NewGroups"));

const MobileInfoOptions = ({ anchor }) => {
  const dispatch = useDispatch();
  const {
    openSmallScreenOptions,
    isSearch,
    isNotification,
    isNewGroup,
    isAboutUser,
  } = useSelector((state) => state.misc);
  const { notificationsCount } = useSelector((state) => state.chat);

  const closeHandler = () => {
    dispatch(setSmallScreenOptions(false));
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
    closeHandler();
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
    closeHandler();
  };
  const openAboutHandler = () => {
    dispatch(setIsProfileDrawerOpen(true));
    closeHandler();
  };
  const handleNotifocations = () => {
    closeHandler();
    openNotifications(dispatch);
  };
  const handleLogout = () => {
    closeHandler();
    logoutHandler(dispatch);
  };
  return (
    <Menu
      open={openSmallScreenOptions}
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
    >
      <Stack direction={"column"} sx={{ width: "maxContent" }}>
        <List>
          <ListItem>
            <Button onClick={openAboutHandler}>
              <InfoIcon sx={{ marginRight: "0.5rem" }} /> About
            </Button>
          </ListItem>

          <ListItem>
            <Button onClick={openSearchDialog}>
              <SearchIcon sx={{ marginRight: "0.5rem" }} /> Search
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={handleNotifocations} value={notificationsCount}>
              <NotificationsIcon sx={{ marginRight: "0.5rem" }} /> Notifications
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={openNewGroup}>
              <AddIcon sx={{ marginRight: "0.5rem" }} /> New Group
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <GroupIcon sx={{ marginRight: "0.5rem" }} /> My Groups
            </Button>
          </ListItem>
          <ListItem>
            <Button color="error" onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
            </Button>
          </ListItem>
        </List>
      </Stack>
      {/* {isAboutUser && } */}
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
    </Menu>
  );
};

export default MobileInfoOptions;
