import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt as CamreaAltIcon } from "@mui/icons-material";
import { VisuallyHidden } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validators";
import { bgGradient } from "../constants/color";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("");
  const password = useStrongPassword("");
  const bio = useInputValidation("");

  const avatar = useFileHandler("single");

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const handleSignin = (e) => {
    e.preventDefault();
  };

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        background: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth={"sm"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            bgcolor: "inherit",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5" sx={{ padding: "5px" }}>
                {" "}
                Sign In{" "}
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  Sign In
                </Button>
                <Typography textAlign={"center"} m={"0.5rem"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={toggleLogin}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5"> Sign Up </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignup}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "container",
                      
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      transition: "background-color 0.2s ease-in-out",
                      ":hover": {
                        bgcolor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CamreaAltIcon />
                      <VisuallyHidden
                        type="file"
                        onChange={avatar.changeHandler}
                      ></VisuallyHidden>
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    color="error"
                    variant="caption"
                    width={"fit-content"}
                    display={"block"}
                    m="1rem auto"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  value={email.value}
                  onChange={email.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"0.5rem"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={toggleLogin}
                >
                  {" "}
                  Sign In Instead{" "}
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
