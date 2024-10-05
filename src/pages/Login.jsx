import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt as CamreaAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHidden } from "../components/styles/StyledComponents";
import { primaryColor } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
import Title from "../components/shared/Title";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("");
  const password = useStrongPassword("");
  const bio = useInputValidation("");

  const avatar = useFileHandler("single");
  const dispatch = useDispatch();
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const handleSignin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/user`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data?.data?.user));
      toast.success(`Welcome back ${data?.data?.user?.name}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong ...!!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/user/new`,
        formData,
        config
      );
      dispatch(userExists(true));
      toast.success(`Welcome, ${data?.data?.createdUser?.name}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong...!!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: primaryColor,
        }}
      >
        <Container
          component={"main"}
          maxWidth={"sm"}
          sx={{
            minHeight: "100vh",
            maxHeight: "100%",
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
                <Title title="Login" />
                <Typography variant="h5" sx={{ padding: "5px" }}>
                  {" "}
                  Welcome Back to Chat App{" "}
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
                <Title title="Register" />
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

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default Login;
