import {
  CalendarMonth as CalerderIcon,
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { transformImg } from "../../lib/feature";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImg(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user.bio} />
      <ProfileCard
        heading={"username"}
        text={user.username}
        Icon={<UsernameIcon />}
      />
      <ProfileCard heading={"Name"} text={user.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Account Created"}
        text={moment(user.createdAt).fromNow()}
        Icon={<CalerderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography varient="body1">{text}</Typography>
      <Typography color={"grey"} varient="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
