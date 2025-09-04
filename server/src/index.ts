import createApp from './app';
import config from './config';
import { createDatabase } from './database';

const database = createDatabase(config.database);
console.log(`Database created for: ${config.env}`);
const app = createApp(database);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${config.port}`);
});
