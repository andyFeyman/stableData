import { defineConfig,loadEnv,searchForWorkspaceRoot } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      tailwindcss(),
      react(),
    ],
    server: {
      host: 'localhost', // 或者 '0.0.0.0'
      proxy: {
        '/api': {
          target: 'http://localhost:8800', // 后端地址
          changeOrigin: true,
          secure: false // 如果后端是 HTTPS，可以设置为 true
        }
      },
      fs:{
        allow:[searchForWorkspaceRoot(process.cwd()),'public','src','node_modules'],
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**','.gitignore']
      }
    },
    define: {
      'process.env': env
    }
  };
});
