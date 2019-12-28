import { html } from 'htm/preact';
import render from 'preact-render-to-string';
import { App } from './components/App.js';
import helperData from '../data/helpers.json';
import slugify from 'slugify';

const helpers = helperData.map(helper => ({
  slug: slugify(helper.name).toLocaleLowerCase(),
  ...helper
}));
const tags = [
  ...helperData.reduce((acc, cur) => {
    acc.add(...cur.tags);
    return acc;
  }, new Set())
];

export function renderApp({ css, tag }) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <!-- fix the font handling -->
        <link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet">
        <style>${css}</style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>CSS scroll shadows</title>
        <script type="module">
          import {renderApp} from './static/bundle.js';
          renderApp({ tag: '${tag}' });
        </script>
      </head>
      <body>
        <div id="app">${render(
          html`
            <${App} currentTag=${tag} helpers=${helpers} tags=${tags} />
          `
        )}</div>
        <script id="data" type="application/json">${JSON.stringify({
          helpers,
          tags
        })}</script>
      </body>
      </html>
    `;
}