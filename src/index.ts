import 'reflect-metadata';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import { buildSchema } from 'type-graphql';

import { InfoResolver } from './graphql/resolvers/info';

async function run(): Promise<void> {
  console.info('⏳ Building GQL schema...');
  const schema = await buildSchema({
    resolvers: [InfoResolver],
  });

  console.info('⏳ Starting Apollo server...');
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: '/graphql',
      }),
    ],
  });
  await server.start();

  console.info('⏳ Starting Koa server...');
  const app = new Koa();
  server.applyMiddleware({
    app,
    bodyParserConfig: {
      jsonLimit: '10mb',
    },
  });

  const port = process.env.SERVER_PORT || 5000;
  app.listen(port);
  console.info(`🚀 Listening on ${port}.`);
}

run().catch((error) => {
  console.error({ error }, `❌ Fatal error.`);
  process.exit(1);
});
