const { renderToString } = require('@vue/server-renderer');

exports.serverRender = async function serverRender(app, template) {
  const appHtml = await renderToString(app, {});
  const html = template.replace(`<!--ssr-outlet-->`, appHtml);

  return {
    html
  } 
}

const indexTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
      <!--preload-links-->
    </head>
    <body>
      <div id="app"><!--ssr-outlet--></div>
      <script type="module" src="/src/main.js"></script>
    </body>
  </html>
`;

exports.indexTemplate = indexTemplate;
