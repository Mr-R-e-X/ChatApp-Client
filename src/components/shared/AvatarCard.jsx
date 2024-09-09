import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImg } from "../../lib/feature.js";
const AvatarCard = ({ avatar = [], max = 3 }) => {
  return (
    <Stack direction={"row"}>
      <AvatarGroup max={max} sx={{ position: "relative" }}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={index}
              src={transformImg(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "2.8rem",
                height: "2.8rem",
                position: "absolute",
                left: `${index * 0.8}rem`,
                boxShadow: "0 0 0 1px white",
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
