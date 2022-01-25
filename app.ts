import * as express from 'express';

const app = express();
const port = 3000;

// Поддержка json body
app.use(express.json());

const fakeDB = {
  users: [
    {
      id: '1',
      name: 'User 1',
    },
    {
      id: '2',
      name: 'User 2',
    },
    {
      id: '3',
      name: 'User 3',
    },
    {
      id: '4',
      name: 'User 4',
    },
    {
      id: '5',
      name: 'User 5',
    },
  ],
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.send(fakeDB.users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.send(fakeDB.users.find((i) => i.id === id));
});

app.post('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = fakeDB.users.findIndex((i) => i.id === id);
  if (index === -1) {
    // Сомневаюсь, что это хорошая практика https://expressjs.com/en/guide/error-handling.html
    res.status(500).send({ error: 'User not found' });
    return;
  }
  fakeDB.users[index] = { ...fakeDB.users[index], ...req.body };
  res.send(fakeDB.users[index]);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  fakeDB.users = fakeDB.users.filter((i) => i.id !== id);
  res.send(`user with id "${id}" successfully deleted`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
