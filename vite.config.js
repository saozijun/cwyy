import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  base: "/cwyy/",
  server: {
    host: "192.168.1.211", // 本地ip
    port: 5050, //端口
  },
  build: {
    outDir: "cwyy", //指定打包输出路径
    assetsDir: "assets", //指定静态资源存放路径
    cssCodeSplit: true, //css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, //是否构建source map 文件

    // 生产环境取消 console
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    //会打包出 css js 等文件夹 目录显得清晰
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
