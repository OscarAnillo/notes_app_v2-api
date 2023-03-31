const express = require("express");
const app = express();
const cors = require("cors");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Javascript & Node are my favorites",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//Create the WebServer port
const PORT = process.env.PORT || 5000;

//Middlerware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Oscar Anillo</h1></p>Fullstack Developer</p>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteId = notes.find((note) => note.id === id);
  if (noteId) {
    res.json(noteId);
  }
  res.status(404).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((item) => item.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const userInput = req.body;
  if (!userInput) {
    return res.status(400).json({
      error: "Your input is required!",
    });
  }
  const newNote = {
    id: generateId(),
    content: userInput.content,
    date: new Date().toISOString(),
    important: Math.random > 0.5,
  };

  notes = notes.concat(newNote);
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

//Server listening
app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
