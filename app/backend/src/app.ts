import * as express from 'express';
import bodyParser = require('body-parser');
import loginRoute from './database/routers/loginRoute';
import teamsRoute from './database/routers/teamsRoute';
import matchesRoute from './database/routers/matchesRoute';
import leaderboardRoute from './database/routers/leaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(loginRoute);
    this.app.use(teamsRoute);
    this.app.use(matchesRoute);
    this.app.use(leaderboardRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
