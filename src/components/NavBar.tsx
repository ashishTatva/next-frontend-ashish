"use client";
import React from "react";
import { ROUTES } from "@/constants/routes";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearCookie, getValueFromCookie } from "../../utils/cookie";
import { Logout } from "@mui/icons-material";
import { USER } from "@/constants/common";

const StyledAppBar = styled(AppBar)({
  position: "static",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const LinkButton = styled(Link)(() => ({
  display: "inline-block",
  padding: "10px 20px",
  color: "#fff",
  textDecoration: "none",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px",
}));

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const userName = getValueFromCookie(USER);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledAppBar>
      <StyledToolbar>
        <Typography variant="h6">Book Rental System</Typography>
        <Box>
          {/* profile dropdown start*/}
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <LinkButton href={ROUTES.DASHBOARD}>Dashboard</LinkButton>
              <LinkButton href={ROUTES.BOOKS}>Books</LinkButton>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {userName?.charAt(0)}
                  </Avatar>
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
                  "&::before": {
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
                <Avatar />
                {userName}
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleClose}>
                <Link
                  href={ROUTES.LOGIN}
                  onClick={() => {
                    clearCookie();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </React.Fragment>
          {/* profile dropdown start end*/}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavBar;

// "use client";
// import React from "react";
// import { ROUTES } from "@/constants/routes";
// import { Box } from "@mui/material";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { clearCookie } from "../../utils/cookie";

// const StyledAppBar = styled(AppBar)({
//   position: "static",
// });

// const StyledToolbar = styled(Toolbar)({
//   display: "flex",
//   justifyContent: "space-between",
// });

// const LinkButton = styled(Link)(() => ({
//   display: "inline-block",
//   padding: "10px 20px",
//   color: "#fff",
//   textDecoration: "none",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
//   marginRight: "10px",
// }));

// const NavBar: React.FC = () => {
//   const router = useRouter();
//   return (
//     <StyledAppBar>
//       <StyledToolbar>
//         <Typography variant="h6">Book Rental System</Typography>
//         <Box>
//           <LinkButton href={ROUTES.DASHBOARD}>Dashboard</LinkButton>
//           <LinkButton href={ROUTES.BOOKS}>Books</LinkButton>
//           <LinkButton
//             href={ROUTES.LOGIN}
//             onClick={() => {
//               clearCookie();
//             }}
//           >
//             Logout
//           </LinkButton>
//         </Box>
//       </StyledToolbar>
//     </StyledAppBar>
//   );
// };

// export default NavBar;
