let notes = [];
let currentId = 1;

const findNoteById = (id) => notes.find(note => note.id === id);
const findNoteIndex = (id) => notes.findIndex(note => note.id === id);

const getNotes = (req, res) => {
  res.json(notes);
};


const getNoteById = (req, res, next) => {
  const noteId = parseInt(req.params.id);
  const note = findNoteById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json(note);
};


const createNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newNote = {
    id: currentId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

const updateNote = (req, res, next) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;
  const noteIndex = findNoteIndex(noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content
  };

  res.json(notes[noteIndex]);
};


const deleteNote = (req, res, next) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = findNoteIndex(noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes = notes.filter(note => note.id !== noteId);
  res.status(204).end();
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};