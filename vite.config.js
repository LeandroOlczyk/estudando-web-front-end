import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        calculator: resolve(__dirname, "src/projects/calculator/calculator.html"),
        tictactoe: resolve(__dirname, "src/projects/tic-tac-toe/game-tic-tac-toe.html"),
        mario: resolve(__dirname, "src/projects/mario-jump/game-mario-jump.html"),
      },
    },
  },
});