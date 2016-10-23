import express from 'express';
import koa from 'koa';
import graphQLHTTP from 'koa-graphql';
import mount from 'koa-mount';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { schema } from './data/schema';
import webpackConfig from './config/webpack.config';
import path from 'path';
import history from 'connect-history-api-fallback';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const graphQLServer = koa();

graphQLServer.use(mount('/', graphQLHTTP({ schema, pretty: true })));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
const compiler = webpack(webpackConfig);

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
  publicPath: '/js/',
  stats: { colors: true },
});

app.use(history());
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
