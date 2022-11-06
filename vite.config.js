import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    // proxy: {
    //   "https://api.hamroelectronics.com.np/api/v1": {
    //     target: "https://api.hamroelectronics.com.np",
    //   },
    // },
  },
  plugins: [react()],
});
