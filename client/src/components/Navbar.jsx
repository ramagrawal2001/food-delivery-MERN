import React from "react";
import { signOut } from "../redux/slices/userSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Fade,
  styled,
  tooltipClasses,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../redux/slices/cartSlice";

const pages = ["Restaurants", "Contact Us", "About Us"];
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#EEF7FF",
    color: "#111111",
    maxWidth: 220,
    border: "1px solid #7AB2B2",
    padding: "8px",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    "& .MuiTooltip-arrow": {
      color: "#EEF7FF",
    },
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetCart());
  };

  return (
    <AppBar position="static" sx={{ px: 2, backgroundColor: "#4D869C" }}>
      <Toolbar disableGutters>
        <StorefrontIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Food Delivery
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ p: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={`/${page.toLowerCase().replace(" ", "-")}`}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <StorefrontIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          E-Commerce
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={`/${page.toLowerCase().replace(" ", "-")}`}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {currentUser ? (
            <React.Fragment>
              <HtmlTooltip
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                placement="bottom-end"
                title={
                  <div>
                    <Typography variant="body2" component="p" align="center">
                      <strong>
                        Hello,{" "}
                        <span style={{ textTransform: "capitalize" }}>
                          {currentUser?.name}
                        </span>
                      </strong>
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      align="center"
                      fontSize="11px"
                    >
                      <strong>Username: </strong> {currentUser?.username}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      align="center"
                      fontSize="11px"
                    >
                      <strong>Email: </strong> {currentUser?.email}
                    </Typography>
                  </div>
                }
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="A" src={currentUser.image} />
                </IconButton>
              </HtmlTooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
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
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to="/profile"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "& .MuiSvgIcon-root": {
                      fontSize: 24, 
                    },
                    "& .MuiTypography-root": {
                    },
                  }}
                >
                  <AccountCircleOutlinedIcon />
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to="/cart"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "& .MuiSvgIcon-root": {
                      fontSize: 24, 
                    },
                    "& .MuiTypography-root": {
                      
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                  <Typography textAlign="center">Cart</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleSignOut}
                  component={Link}
                  to="/"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "& .MuiSvgIcon-root": {
                      fontSize: 24,
                    },
                    "& .MuiTypography-root": {
                      
                    },
                  }}
                >
                  <LogoutOutlinedIcon />
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                key={"signIn"}
                onClick={handleCloseUserMenu}
                component={Link}
                to="/signin"
                sx={{ color: "white" }}
              >
                <Typography textAlign="center" sx={{ color: "inherit" }}>
                  SignIn
                </Typography>
              </Button>
              <Button
                key={"signUp"}
                onClick={handleCloseUserMenu}
                component={Link}
                to="/signup"
                sx={{ color: "white" }}
              >
                <Typography textAlign="center" sx={{ color: "inherit" }}>
                  SignUp
                </Typography>
              </Button>
            </React.Fragment>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
