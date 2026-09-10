import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        plantillas: resolve(__dirname, "plantillas.html"),
        privacidad: resolve(__dirname, "privacidad.html"),
        terminos: resolve(__dirname, "terminos.html")
      }
    }
  }
});
