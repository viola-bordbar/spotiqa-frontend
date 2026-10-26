import { defineConfig } from 'vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';


export default defineConfig({
    plugins: [
        vueJsxPlugin(),
    ],
    server: {
        port: 8080,
         hmr:{
            port: 24678,
        }
    },
    build: {
        sourcemap: true,
        minify: false
    }
});