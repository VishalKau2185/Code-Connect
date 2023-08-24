import express from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aceapollo258288$',
  database: 'tinder_app',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello Backend");
});

app.get("/people", (req, res) => {
  const q = "SELECT * FROM people";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/people', (req, res) => {
  const { name, email, password, bio, imageLink, college } = req.body;
  const q =
    'INSERT INTO people (`name`, `email`, `password`, `bio`, `imageLink`, `college`) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, email, password, bio, imageLink, college];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.patch("/people/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const q = `
    UPDATE people
    SET ? 
    WHERE id = ?
  `;

  db.query(q, [updatedData, userId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json({ message: 'Profile updated successfully' });
  });
});

app.listen(8800, () => {
  console.log("Connected to the backend on port 8800");
});