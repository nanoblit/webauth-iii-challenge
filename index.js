const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./data/db');

const app = express();
app.use(express.json());

function restricted(req, res, next) {
  // Do some jwt stuff
  // if () {
  //   next();
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
  next();
}

async function checkCredentialsInBody(req, res, next) {
  try {
    const { name, password } = req.body;
    const user = await db.getUserByName(name);
    if (!user || !bcrypt.compare(password, user.password)) {
      res.status(401).json({ error: 'You shall not pass!' });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

app.get('/api/users', restricted, async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.post('/api/register', async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.name || !body.password) {
      res.status(400).json({ error: 'Name and password are required' });
    } else if (await db.getUserByName(body.name)) {
      res.status(400).json({ error: 'Name must be unique' });
    } else {
      const password = await bcrypt.hash(body.password, 12);
      const user = await db.addUser({ ...body, password });
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/login', checkCredentialsInBody, (req, res, next) => {
  // Do some jwt stuff
  res.status(200).json('Logged in');
});

app.use((err, req, res) => {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(4000, () => {
  console.log('listening on 4000');
});
