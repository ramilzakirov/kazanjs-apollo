import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import schema from './graphql/schema';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('*', cors({ origin: 'http://localhost:8080' }));

app.use(
  '/graphql',
  graphqlExpress({ schema })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:8080/subscriptions`
  })
);

const server = createServer(app);

server.listen(8080, () => {
  console.log('API Server is running on http://localhost:8080');

  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server,
    path: '/subscriptions',
  });
  console.log('API Server with subscriptions is running on ws://localhost:8080/subscriptions');
});
