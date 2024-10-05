import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import {
  accentColor,
  grayColor,
  neutralColor,
  primaryColor,
} from "../../constants/color";

const VisuallyHidden = styled("input")({
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

const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "white",
  padding: "1rem",
  backgroundColor: "accentColor",
  transition: "all 0.2s ease-in-out",
  margin: "4px 0",
  "&:hover": {
    background: neutralColor,
    color: "white",
    fontWeight: "600",
  },
});

const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  backgroundColor: `${grayColor}`,
});

const SearchFeild = styled("input")({
  padding: "1rem 1rem",
  width: "20vmax",
  border: "none",
  outline: "none",
  backgroundColor: "#f1f1f1",
  borderRadius: "1.5rem",
  fontSize: "1.1rem",
});

const CurveButton = styled("button")({
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

const bounceAnimation = keyframes`
  0%{transform: scale(1)}
  50%{transform: scale(1.5)}
  100%{transform: scale(1)}
`;

const BounceSkeleton = styled(Skeleton)({
  animation: `${bounceAnimation} 1.5s infinite`,
  background: accentColor,
});

export {
  VisuallyHidden,
  Link,
  InputBox,
  SearchFeild,
  CurveButton,
  grayColor,
  neutralColor,
  primaryColor,
  BounceSkeleton,
};
