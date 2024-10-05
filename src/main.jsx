import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.js";

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
    backgroundColor: "#333",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
);
