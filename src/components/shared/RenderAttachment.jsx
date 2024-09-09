import React from "react";
import { transformImg } from "../../lib/feature";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} />;

    case "image":
      return (
        <img
          src={transformImg(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
