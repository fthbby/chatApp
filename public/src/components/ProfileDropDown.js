import * as React from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  ListItemIcon,
  Grid
} from "@mui/material";
import avatar from "../assets/avatar.jpg";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function BasicMenu({currentUser}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogOut = async () => {
    await localStorage.clear();
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("currentUser", currentUser)

  return (
    <div>
      {/* <Box component="img" src={avatar}
      style={{cursor:'pointer', borderRadius:25, width:50, height:50}}
       onClick={handleClick} />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}

      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32,  borderRadius:25, width:50, height:50 }}>NZ</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
          <Box display={'flex'}>
          <Avatar style={{width:75, height:75}}/> 
          
          <Box display='flex' flexDirection={'column'}>
         <Typography>
         {currentUser?.username}
         </Typography> 
         <Typography color='gray'>{currentUser?.email}</Typography>
         <Typography>Available</Typography>

          </Box>

          </Box>
          </MenuItem>
    
          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContactMailIcon fontSize="small" />
            </ListItemIcon>
            Manage Account
          </MenuItem>
          <Divider />

          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>{/* <Logout fontSize="small" /> */}</ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </>
    </div>
  );
}
