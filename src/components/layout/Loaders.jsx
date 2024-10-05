import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { BounceSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh-4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton variant="rounded" height={"100vh"} />
      </Grid>
      <Grid item xs={12} sm={8} height={"100%"}>
        <Stack spacing={"1rem"} marginTop={"1rem"}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <Skeleton key={idx} variant="rounded" height={"4.5rem"} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BounceSkeleton
        variant="circular"
        width={15}
        height={15}
        sx={{ marginBottom: "10px" }}
        style={{ animationDelay: "0.2s" }}
      />
      <BounceSkeleton
        variant="circular"
        width={15}
        height={15}
        sx={{ marginBottom: "10px" }}
        style={{ animationDelay: "0.4s" }}
      />
      <BounceSkeleton
        variant="circular"
        width={15}
        height={15}
        sx={{ marginBottom: "10px" }}
        style={{ animationDelay: "0.6s" }}
      />
      <BounceSkeleton
        variant="circular"
        width={15}
        height={15}
        sx={{ marginBottom: "10px" }}
        style={{ animationDelay: "0.8s" }}
      />
      <BounceSkeleton
        variant="circular"
        width={15}
        height={15}
        sx={{ marginBottom: "10px" }}
        style={{ animationDelay: "0.10s" }}
      />
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
