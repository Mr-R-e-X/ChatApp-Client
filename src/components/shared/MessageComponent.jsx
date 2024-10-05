import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { accentColor, lightBlue, neutralColor } from "../../constants/color";
import { fileFormat, format } from "../../lib/feature";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt, type } = message;

  const timeAgo = moment(createdAt).fromNow();
  const sameSender = sender?._id === user._id;
  return (
    <>
      {type === "alert" ? (
        <div
          style={{
            alignSelf: "center",
            backgroundColor: "white",
            color: accentColor,
            borderRadius: "5px",
            padding: "0 0.5rem",
            width: "fit-content",
            backgroundColor: "inherit",
          }}
        >
          <Typography> {content} </Typography>
        </div>
      ) : (
        <div
          style={{
            alignSelf: sameSender ? "flex-end" : "flex-start",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
            padding: "0 0.5rem",
            width: "fit-content",
            backgroundColor: sameSender ? "white" : neutralColor,
          }}
        >
          {!sameSender ? (
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
          ) : (
            <Typography
              variant="caption"
              color={lightBlue}
              fontWeight={"600"}
              paddingTop={"0px"}
              marginTop={"0px"}
              sx={{ textAlign: "start" }}
            >
              {" "}
              You{" "}
            </Typography>
          )}
          {content && <Typography> {content} </Typography>}
          {attachments.length > 0 &&
            attachments.map((attachment, idx) => {
              const url = attachment.url;
              const file = fileFormat(url);
              const type = format(url);
              const fileName = `${
                user.username
              }_${new Date().getTime()}.${type}`;
              return (
                <Box key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    download={fileName}
                    rel="noopener noreferrer"
                    style={{ color: "black" }}
                  >
                    <RenderAttachment file={file} url={url} />
                  </a>
                </Box>
              );
            })}

          <Typography variant="caption">{timeAgo}</Typography>
        </div>
      )}
    </>
  );
};

export default memo(MessageComponent);
