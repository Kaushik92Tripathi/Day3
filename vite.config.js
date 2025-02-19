import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ,tailwindcss()],
  base:'https://github.com/kaushik92tripathi/Day3'
})
