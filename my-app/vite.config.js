import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind v4 is wired in here as a Vite plugin — no tailwind.config.js needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});