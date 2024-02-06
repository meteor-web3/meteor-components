import { resolve } from "path";

import inject from "@rollup/plugin-inject";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import dotenv from "dotenv";
import EnvironmentPlugin from "vite-plugin-environment";
import RollupPluginDotenv from "rollup-plugin-dotenv";

const env = dotenv.config();
const config = defineConfig({
  plugins: [
    // provider .env to process.env (only AVAILABLE in DEV mode)
    ...(env.parsed ? [EnvironmentPlugin(Object.keys(env.parsed))]: []),
    dts({
      outDir: "dist/esm",
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
    }),
    dts({
      outDir: "dist/cjs",
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
    })
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  build: {
    target: "modules",
    minify: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@emotion/react", "@emotion/react/jsx-runtime", "@emotion/styled"],
      plugins: [
        inject({ Buffer: ["buffer", "Buffer"] }),
        // provider .env to process.env (only AVAILABLE in PROD mode)
        RollupPluginDotenv(),
      ],
      input: ["src/index.ts"],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'dist/esm',
          preserveModulesRoot: 'src'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'dist/cjs',
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index",
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  esbuild: {
    jsxFactory: "_jsx",
    jsxInject: `import { jsx as _jsx } from '@emotion/react'; import { Fragment as __Fragment } from 'react';`,
    jsxFragment: "__Fragment",
  },
  server: {
    port: 3008,
    host: "0.0.0.0",
  },
});

export default config;
