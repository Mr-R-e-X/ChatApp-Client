import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color={"error"} sx={{ textAlign: "center" }}>
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          <Typography>
            Please confirm that you would like to proceed with this action. This
            change cannot be undone.
          </Typography>
          <div>
            <Typography sx={{ fontStyle: "italic" }}>
              Press <span style={{ color: "red" }}>"Yes"</span> to confirm or{" "}
              <span style={{ color: "green" }}>"Cancel"</span> to go back.
            </Typography>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button onClick={handleClose} color="success">
          No
        </Button>
        <Button onClick={deleteHandler} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
