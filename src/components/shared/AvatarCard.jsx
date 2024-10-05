import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { secondaryColor } from "../../constants/color.js";
import { transformImg } from "../../lib/feature.js";
const AvatarCard = ({ avatar = [], max = 3 }) => {
  const avatarType = typeof avatar;
  return (
    <Stack direction={"row"}>
      <AvatarGroup max={max} sx={{ position: "relative", marginRight: "5px" }}>
        <Box width={"5rem"} height={"3rem"}>
          {avatarType === "object" ? (
            [...avatar].map((i, index) => (
              <Avatar
                key={index}
                src={transformImg(i)}
                alt={`Avatar ${index}`}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  position: "absolute",
                  left: `${index * 0.8}rem`,
                  boxShadow: "0 0 0 1px white",
                  transition: "all 0.2s ease-in-out",
                  background: secondaryColor,
                  "&:hover": {
                    transform: "scale(1.2)",
                    zIndex: 1,
                  },
                }}
              />
            ))
          ) : (
            <Avatar
              src={transformImg(avatar)}
              alt="user_profile"
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                boxShadow: "0 0 0 1px white",
              }}
            />
          )}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export const AvatarChatInfoCard = ({
  avatar = [],
  max = 3,
  height = "140px",
  width = "140px",
}) => {
  const avatarType = Array.isArray(avatar) ? "array" : "string";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        paddingRight: 1,
      }}
    >
      <AvatarGroup
        max={max}
        sx={{
          "& .MuiAvatar-root": {
            border: "2px solid white",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
          },
          "& .MuiAvatarGroup-avatar": {
            marginLeft: "-2rem",
          },
        }}
      >
        {avatarType === "array" ? (
          avatar.map((i, index) => (
            <Avatar
              key={index}
              src={transformImg(i)}
              alt={`Avatar ${index + 1}`}
              sx={{
                width: width,
                height: height,
                backgroundColor: secondaryColor,
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.2)",
                  zIndex: 1,
                },
              }}
            />
          ))
        ) : (
          <Avatar
            src={transformImg(avatar)}
            alt="User Avatar"
            sx={{
              width: width,
              height: height,
              backgroundColor: secondaryColor,
              cursor: "pointer",
              border: "2px solid white",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
            }}
          />
        )}
      </AvatarGroup>
    </Box>
  );
};

export default AvatarCard;
