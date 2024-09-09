import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalerderIcon,
} from "@mui/icons-material";
import React from "react";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"hey there I am here!"} />
      <ProfileCard
        heading={"Username"}
        text={"souvikhazra"}
        Icon={<UsernameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Souvik Hazra"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2023-11-04T18:30:00.000Z").fromNow()}
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
