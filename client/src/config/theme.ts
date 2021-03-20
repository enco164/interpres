import { createMuiTheme } from "@material-ui/core";

const font = "'Work Sans', sans-serif";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#344955",
      "800": "#232F34",
      "600": "#4A6572",
    },
    secondary: {
      main: "#F9AA33",
    },
  },
  typography: {
    fontFamily: font,
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 400,
    },
    h4: {
      fontWeight: 400,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    caption: {
      fontWeight: 400,
    },
    overline: {
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "16px",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
    },
  },
});
