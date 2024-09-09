import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const globalStyles = {
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "#333", // Scrollbar track color
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
};

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>
    </ThemeProvider>
  </HelmetProvider>
);
