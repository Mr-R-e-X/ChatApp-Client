import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import React, { memo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { secondaryColor } from "../../constants/color";
import { useErrors } from "../../hooks/hooks";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { setIsNotifiaction } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isLoading, error, data, isError } = useGetNotificationQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  useErrors([{ error, isError }]);

  const friendRequestHandler = async (_id, accept) => {
    const toastId = toast.loading("Accepting Request...");
    try {
      const data = await acceptRequest({ requestId: _id, accept });
      closeHandler();
      toast.success(data?.data?.data?.message, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  const closeHandler = () => dispatch(setIsNotifiaction(false));

  return (
    <Dialog
      open={isNotification}
      maxWidth={"sm"}
      fullWidth
      onClose={closeHandler}
    >
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={"100%"}
        sx={{ background: secondaryColor }}
      >
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.data?.allRequests.length > 0 ? (
              data?.data?.allRequests.map((i) => (
                <NotificationItem
                  sender={i.sender}
                  _id={i._id}
                  handler={friendRequestHandler}
                  key={i._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No new Notications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar
          src={avatar}
          sx={{ height: "3.5rem", width: "3.5rem", border: "1px solid white" }}
        />
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              width: "100%",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography variant="caption" color={"green"}>
            {" "}
            send you friend request.{" "}
          </Typography>
        </Box>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button color="success" onClick={() => handler(_id, true)}>
            Accept
          </Button>
          <Button color="error" onClick={() => handler(_id, false)}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
