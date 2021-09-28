# Spr colors

## UI

![Demo](https://user-images.githubusercontent.com/290646/135177212-e1639da6-4f07-4630-be95-8f79e2604d24.png)

## Development

The `public/index.html` file contains a `<script src='bundle.js'>` tag, which means we need to create `public/bundle.js`.
The `rollup.config.js` file tells Rollup how to create this bundle, starting with `src/app.js` and including all its dependencies.

Current tree structure:
```
src
├── app.js
├── color.js
├── data
│   └── mtn94.json
├── footer.js
├── palette.js
├── search-result.js
├── search.js
└── utils.js
```

`npm run build` builds the application to `public/bundle.js`, along with a sourcemap file for debugging.

`npm start` launches a server, using [serve](https://github.com/zeit/serve). Navigate to [localhost:5000](http://localhost:5000).

`npm run watch` will continually rebuild the application as your source files change.

`npm run dev` will run `npm start` and `npm run watch` in parallel.

## License

[MIT License](LICENSE).
