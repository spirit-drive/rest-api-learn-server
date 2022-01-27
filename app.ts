import * as express from 'express';
import * as multer from 'multer';
import * as cors from 'cors';

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

// Поддержка json body
app.use(express.json());

app.use(cors());

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

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = fakeDB.users.findIndex((i) => i.id === id);
  if (index === -1) {
    // Сомневаюсь, что это хорошая практика https://expressjs.com/en/guide/error-handling.html
    res.status(500).send({ error: 'User not found' });
    return;
  }
  // console.log(req.body);
  fakeDB.users[index] = { ...fakeDB.users[index], ...req.body };
  res.send(fakeDB.users[index]);
});

app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = fakeDB.users.findIndex((i) => i.id === id);
  if (index === -1) {
    // Сомневаюсь, что это хорошая практика https://expressjs.com/en/guide/error-handling.html
    res.status(500).send({ error: 'User not found' });
    return;
  }
  // console.log(req.body);
  fakeDB.users[index] = { ...fakeDB.users[index], name: req.body?.name };
  res.send(fakeDB.users[index]);
});

app.post('/users', (req, res) => {
  fakeDB.users.push({ ...req.body, id: Math.random().toString(16) });
  res.send(fakeDB.users[fakeDB.users.length - 1]);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  fakeDB.users = fakeDB.users.filter((i) => i.id !== id);
  res.send(`user with id "${id}" successfully deleted`);
});

app.post('/upload', upload.single('avatar'), (req) => {
  // req.file is the `avatar` file
  console.log(req.file);
  // req.body will hold the text fields, if there were any
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
