import { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@server/src/app.module';

const dev = process.env.NODE_ENV !== 'production';
const port = 8080;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const server = await NestFactory.create(AppModule);
    server.use(
      '/',
      async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (
          req.url === '/graphql' ||
          req.url === '/refresh/cookies' ||
          req.url === '/refresh/figures' ||
          req.url === '/refresh/images'
        ) {
          next();
        } else {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handle(req, res);
        }
      },
    );
    server
      .listen(port, () => {
        console.log(`Ready on http://localhost:${port}`);
      })
      .catch((err: any) => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  });
