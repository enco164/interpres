import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserProfileDropdown } from "../features/auth/user-profile-dropdown";
import { useAppLayout } from "./use-app-layout";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  toolbarIconButton: {
    transform: (props: { open: boolean }) =>
      `rotate(${props.open ? 0 : 180}deg)`,
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: theme.spacing(8),
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  listItems: {
    flex: "1 1 auto",
  },
  hide: {
    display: "none",
  },
}));

interface AppLayoutProps {}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isInnerOpen = isLg ? true : open;

  const handleToggleDrawerOpen = () => {
    setOpen((o) => !o);
  };
  const { menuItems } = useAppLayout();

  React.useEffect(() => {
    if (!menuItems) {
      setOpen(false);
    }
  }, [menuItems]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const classes = useStyles({ open: isInnerOpen });
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {!isLg && menuItems && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleDrawerOpen}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Interpres
            </Link>
          </Typography>
          <UserProfileDropdown />
        </Toolbar>
      </AppBar>
      {menuItems && (
        <Drawer
          variant={isLg ? "permanent" : "temporary"}
          classes={{
            paper: `${classes.drawerPaper} ${
              !isInnerOpen && classes.drawerPaperClose
            }`,
          }}
          open={isInnerOpen}
          onClose={handleToggleDrawerOpen}
        >
          <div className={classes.listItems}>{menuItems}</div>
          {!isLg && (
            <>
              <Divider />
              <div
                className={classes.toolbarIcon}
                onClick={handleToggleDrawerOpen}
              >
                <IconButton className={classes.toolbarIconButton}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
            </>
          )}
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box>{children}</Box>
        </Container>
      </main>
    </div>
  );
};
