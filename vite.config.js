import { defineConfig,loadEnv,searchForWorkspaceRoot } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  //console.log(env);
  
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
    preview: {
      // 允许访问预览服务器的主机名列表
      allowedHosts: [
        'chainmonitor.xyz', // <-- 添加你的域名在这里
        // 如果你还需要通过 localhost 或 127.0.0.1 访问这个预览服务器，也可以加上
        // 'localhost',
        // '127.0.0.1'
      ],
      // 你可能还需要配置 preview 的端口等，如果需要的话
      // port: 5000,
      // strictPort: true,
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(process.env).filter(([key]) => key.startsWith('VITE_'))
      ),
    }
  };
});
