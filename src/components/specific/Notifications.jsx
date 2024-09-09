import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import React, { memo } from "react";
import { smapleNotifications } from "../../constants/sampleData";

const Notifications = () => {
  const friendRequestHandler = (_id, accept) => {
    console.log("friendRequestHandler");
  };

  return (
    <Dialog open maxWidth={"xs"} fullWidth>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"100%"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {smapleNotifications.length > 0 ? (
          smapleNotifications.map((i, idx) => (
            <NotificationItem
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
              key={idx}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No new Notications</Typography>
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
        <Avatar src={avatar[0]} />
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
          {`${name} send you a friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button
            color="success"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
