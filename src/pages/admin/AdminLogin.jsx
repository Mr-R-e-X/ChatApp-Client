import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";

const isAdmin = true;

const AdminLogin = () => {
  const secretKey = useInputValidation("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  if (isAdmin) return <Navigate to={"/admin/dashboard"} />;

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
          <Typography variant="h5" sx={{ padding: "5px" }}>
            {" "}
            Admin Login{" "}
          </Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
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
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
