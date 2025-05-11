import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Task Manager",
        short_name: "TaskMgr",
        description: "A simple React TypeScript task manager PWA",
        theme_color: "#171717",
        icons: [
          {
            src: "pwa-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#171717",
      },
    }),
  ],
});
