import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../constants/color";

export const VisuallyHidden = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
});

export const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "white",
  padding: "1rem",
  backgroundColor: "inherit",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255,255,255, 0.9)",
    color: "black",
    fontWeight: "600",
  },
});

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  backgroundColor: `${grayColor}`,
});

export const SearchFeild = styled("input")({
  padding: "1rem 1rem",
  width: "20vmax",
  border: "none",
  outline: "none",
  backgroundColor: "#f1f1f1",
  borderRadius: "1.5rem",
  fontSize: "1.1rem",
});

export const CurveButton = styled("button")({
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  outline: "none",
  padding: "1rem 2rem",
  borderRadius: "2rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});
