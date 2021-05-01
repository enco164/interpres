import React from "react";
import { useAuth } from "./use-auth";
import {
  Avatar,
  Box,
  Link,
  makeStyles,
  Popover,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { LogoutButton } from "./logout-button";

interface UserProfileDropdownProps {}

const useStyles = makeStyles((theme) => ({
  popover: { marginTop: theme.spacing(2) },
  avatar: { cursor: "pointer" },
}));

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = () => {
  const location = useLocation();
  const { authenticated, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!authenticated) {
    return (
      <Link
        color="secondary"
        component={RouterLink}
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      >
        Sign in
      </Link>
    );
  }

  const open = Boolean(anchorEl);
  const id = open ? "user-profile-popover" : undefined;

  return (
    <div>
      <Avatar
        src={user?.photo}
        onClick={handleClick}
        aria-describedby={id}
        className={classes.avatar}
      >
        {user?.displayName[0].toUpperCase()}
      </Avatar>
      <Popover
        id={id}
        open={open}
        className={classes.popover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={2} textAlign="center">
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar src={user?.photo}>
              {user?.displayName[0].toUpperCase()}
            </Avatar>
          </Box>
          <Typography>{user?.displayName}</Typography>
          <Box mt={2}>
            <LogoutButton />
          </Box>
        </Box>
      </Popover>
    </div>
  );
};
