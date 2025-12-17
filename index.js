const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
// Sample in-memory movies data
let movies = [
  {
    id: uuidv4(),
    title: 'Inception',
    description: "A dream thief enters people's subconscious.",
    genre: { name: 'Sci-Fi', description: 'Science fiction' },
    director: { name: 'Christopher Nolan', birth: 1970 },
    imageURL: 'https://example.com/inception.jpg',
    featured: true
  },
  {
    id: uuidv4(),
    title: 'The Matrix',
    description: 'A hacker discovers the nature of reality.',
    genre: { name: 'Action', description: 'High-energy, exciting films' },
    director: { name: 'The Wachowskis', birth: 1965 },
    imageURL: 'https://example.com/matrix.jpg',
    featured: true
  }
];

// GET all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET a single movie by title
app.get('/movies/:title', (req, res) => {
  const movie = movies.find(m => m.title.toLowerCase() === req.params.title.toLowerCase());
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// POST a new movie
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuidv4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// DELETE a movie by ID
app.delete('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);

  if (movie) {
    movies = movies.filter(m => m.id !== req.params.id);
    res.status(200).send(`Movie ${req.params.id} was deleted.`);
  } else {
    res.status(404).send('Movie not found');
  }
});

// UPDATE movie details by title
app.put('/movies/:title', (req, res) => {
  const movie = movies.find(m => m.title.toLowerCase() === req.params.title.toLowerCase());

  if (movie) {
    Object.assign(movie, req.body); // update movie properties
    res.status(200).send(`Movie ${req.params.title} was updated.`);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
