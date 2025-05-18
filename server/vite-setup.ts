import { ViteDevServer } from 'vite';
import { IncomingMessage, ServerResponse } from 'http';
import { createServer as createViteServer } from 'vite';

export async function setupVite(app: any, server: any) {
  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Handle all other requests with Vite's HTML transform
  app.use('*', async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = req.originalUrl || req.url;
      
      // Transform index.html
      let template = await vite.transformIndexHtml(url, `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vite App</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="/src/main.ts"></script>
          </body>
        </html>
      `);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      console.error(e);
      res.statusCode = 500;
      res.end(e instanceof Error ? e.message : 'Internal error');
    }
  });
}
