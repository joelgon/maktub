import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes';

export default class Server {
  private express: express.Application;

  private port: number;

  private routes: Routes = new Routes();

  public constructor() {
    this.express = express();
    this.port = 3003;
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(Cors());
    this.routes.routes(this.express);
  }

  public async listen(): Promise<void> {
    await this.express.listen(this.port);
    console.log(`server listening on port: ${this.port}`);
  }
}
