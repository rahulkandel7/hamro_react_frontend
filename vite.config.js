import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://192.168.1.102:8000",
      },
    },
  },
  plugins: [react()],
});
