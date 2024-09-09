import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { bgGradientColor2, bgGradientColor3 } from "../../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        minHeight: "calc(100vh - 2rem)", // Adjust based on your design
        paddingBottom: "2rem", // Adjust based on your design
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          marginTop: "1rem",
          background: bgGradientColor3,
          overflow: "hidden",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "1rem 0",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          sx={{
            border: "none",
            height: "80vh",
            ".table-header": {
              bgcolor: bgGradientColor2,
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
