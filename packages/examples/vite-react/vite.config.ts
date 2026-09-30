import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // The workspace-linked library and this app must use one React instance.
    dedupe: ["react", "react-dom"],
  },
});
