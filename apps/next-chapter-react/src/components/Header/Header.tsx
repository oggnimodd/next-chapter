import React, { FC, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Search,
  DarkMode,
  LightMode,
  Home,
  AccountCircle,
  ExitToApp,
} from "@mui/icons-material";
import { useUser, useAuth, useClerk } from "@clerk/clerk-react";
import { useDarkMode } from "hooks";

const Header: FC = () => {
  const { toggleTheme, isDark } = useDarkMode();
  const { signOut } = useAuth();
  const { openSignIn } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className="container mx-auto">
        <Typography
          component={Link}
          to={isSignedIn ? "/dashboard" : "/"}
          variant="h6"
          className="dark:text-primary-main text-white font-bold text-2xl"
        >
          Logo
        </Typography>
        <div className="ml-auto flex gap-x-2 items-center">
          <IconButton
            aria-label="search"
            color="inherit"
            component={Link}
            to="/search"
            size="large"
          >
            <Search />
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            aria-label="dark-mode"
            color="inherit"
            size="large"
          >
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>

          {isLoaded && !isSignedIn && (
            <Button
              className="text-white"
              variant="text"
              onClick={() => openSignIn()}
            >
              Sign in
            </Button>
          )}
          {isLoaded && isSignedIn && (
            <Avatar
              className="cursor-pointer"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              src={user?.imageUrl}
            />
          )}

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">
              <Home className="mr-3" />
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/profile">
              <AccountCircle className="mr-3" />
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/search">
              <Search className="mr-3" />
              Search Books
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                signOut();
              }}
              className="text-error-main"
            >
              <ExitToApp className="mr-3" />
              Sign Out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
