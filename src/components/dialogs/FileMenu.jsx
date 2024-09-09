import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return <Menu open={false} anchorEl={anchorE1}></Menu>;
};

export default FileMenu;
