import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    https: true,
  },
  plugins: [basicSsl(), react()],
});
