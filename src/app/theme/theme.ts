import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#465fff" },
    background: { default: "#ffffffff", paper: "#ffffffff" },
    text: { primary: "#1e2e74", secondary: "#9aa3b2"},
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ["Inter", "system-ui", "sans-serif"].join(","),
  },
});

export default theme;
