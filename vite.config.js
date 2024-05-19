import { defineConfig } from "vite";
import { resolve } from "path";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "contacts.html"),
      },
    },
  },
});
