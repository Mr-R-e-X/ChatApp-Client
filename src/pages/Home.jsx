import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { primaryColor } from "../constants/color";

const Home = () => {
  return (
    <Box
      height={"100%"}
      sx={{
        background: primaryColor,
      }}
    >
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a fiend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
