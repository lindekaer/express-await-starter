import express from 'express';
import bodyParser from 'body-parser';
import { asyncRequest } from './utils/helpers';

const port = process.env.PORT || 9000;
const mode = process.env.NODE_ENV || 'development';
const pathStaticFiles = '../public';
const pathViews = './views';

const app = express();
app.listen(port, () => {
  console.log(`\n ⚡️ Server running in ${mode} on port ${port} ⚡️ \n`);
});

app.set('view engine', 'pug');
app.set('views', pathViews);
app.use('/', express.static(pathStaticFiles));
app.use(bodyParser.json());

app.get('/users', asyncRequest(async (req, res) => {
  const users = await fetchUsers();
  res.send(users);
}));

function fetchUsers() {
  // Function to be 'awaited' must return a promise
  return new Promise((resolve, reject) => {
    // Simulate async call to the database
    setTimeout(() => {
      return resolve([
        { username: 'Bob19', age: 19 },
        { username: 'LisaManning', age: 29 },
        { username: 'Bananonax', age: 31 },
        { username: 'Letty', age: 22 }
      ]);
    }, 2000);
  });
}
