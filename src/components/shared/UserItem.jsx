import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { accentColor } from "../../constants/color";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
  disable = false,
}) => {
  const { name, _id, avatar, username, email } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{ objectFit: "cover", scale: "1.3", border: "1px solid white" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
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
            {username}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              width: "100%",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: accentColor,
            }}
          >
            {" "}
            {name}{" "}
          </Typography>
        </Box>

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          onClick={() => handler({ _id, name, avatar, username, email })}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
