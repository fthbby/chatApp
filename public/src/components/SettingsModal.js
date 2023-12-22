import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactMailIcon from "@mui/icons-material/ContactMail";

function SettingsModal({ open, onClose }) {
  const [isActive, setIsActive] = useState("General");

  const navItems = [
    { title: "General", icon: <SettingsIcon sx={{ mr: 1, color: "gray" }} /> },
    {
      title: "Accounts",
      icon: <ContactMailIcon sx={{ mr: 1, color: "gray" }} />,
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box style={styles} backgroundColor="white" borderRadius={1} padding={2}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography id="modal-modal-title" variant="h6">
            Settings
          </Typography>
          <CloseIcon onClick={onClose} sx={{ cursor: "pointer", color:'gray' }} />
        </Box>

        <Grid container mt={2}>
          <Grid item md={4} display={"flex"} flexDirection={"column"}>
            {navItems.map((x) => (
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={() => setIsActive(x.title)}
                sx={{
                  padding: 1,
                  cursor: "pointer",
                  transition: " background 0.3s ease-in-out",
                  "&:hover": {
                    background: "#EBEBEB",
                  },
                }}
              >
                {x.icon} {x.title}
              </Box>
            ))}
          </Grid>

          <Grid item md={1} />
          <Grid item md={7}>
            {isActive == "General" && <>General</>}

            {isActive == "Accounts" && <>Accounts</>}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  minHeight:600,
  boxShadow: 24,
  p: 4,
};

export default SettingsModal;
