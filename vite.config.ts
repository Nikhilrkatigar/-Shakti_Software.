import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

function cmsPlugin(): Plugin {
  return {
    name: 'cms-plugin',
    configureServer(server) {
      server.middlewares.use('/api/content', (req, res, next) => {
        if (req.method === 'GET') {
          try {
            const dataPath = path.resolve(__dirname, 'src/data/content.json');
            const data = fs.readFileSync(dataPath, 'utf-8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        } else {
          next();
        }
      });

      server.middlewares.use('/api/save-content', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const dataPath = path.resolve(__dirname, 'src/data/content.json');
              // Format with 2 spaces for readability
              fs.writeFileSync(dataPath, JSON.stringify(JSON.parse(body), null, 2));
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Absolute base is required: relative './' breaks asset URLs on nested
  // routes such as /work/:slug once the app is deployed.
  base: '/',
  plugins: [inspectAttr(), react(), cmsPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
