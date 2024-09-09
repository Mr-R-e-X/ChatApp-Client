import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/feature";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const timeAgo = moment(createdAt).fromNow();
  const sameSender = sender?._id === user._id;
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography
          variant="caption"
          color={lightBlue}
          fontWeight={"600"}
          paddingTop={"0px"}
          marginTop={"0px"}
        >
          {" "}
          {sender.name}{" "}
        </Typography>
      )}
      {content && <Typography> {content} </Typography>}
      {attachments.length > 0 &&
        attachments.map((attachment, idx) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={idx}>
              <a href="" target="_blank" download style={{ color: "black" }}>
                {<RenderAttachment file={file} url={url} />}
              </a>
            </Box>
          );
        })}
      <Typography variant="caption">{timeAgo}</Typography>
    </div>
  );
};

export default memo(MessageComponent);
