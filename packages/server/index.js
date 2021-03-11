const connect = require('connect');
const http = require('http');
const { createServer: createViteServer } = require('vite');
const { serverRender, indexTemplate } = require('../render/server')

module.exports = async function startServer(root = process.cwd()) {
  const app = connect();
  const viteServer = await createViteServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
    },
  });

  app.use(viteServer.middlewares);

  app.use(async (request, response, next) => {
    if (request.method !== 'GET') {
      return next();
    }

    try {
      const url = request.originalUrl;
      const template = await viteServer.transformIndexHtml(url, indexTemplate);
      const startUpServerApp = (await viteServer.ssrLoadModule('/src/main.js')).default;
      const { app } = await startUpServerApp(url);
      const { html } = await serverRender(app, template)

      response.setHeader('Content-Type', 'text/html');
      response.end(html);
    } catch (error) {
      viteServer && viteServer.ssrFixStacktrace(error);

      response.statusCode = 500;
      response.end(error.stack);
    }
  });

  http.createServer(app).listen(3000, () => {
    console.log('http://localhost:3000');
  });
}
