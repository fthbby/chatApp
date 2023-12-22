import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


function SettingsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box style={styles} backgroundColor="white" borderRadius={1} padding={3}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Settings
          </Typography>
          <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
        </Box>

        <Typography sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default SettingsModal;
