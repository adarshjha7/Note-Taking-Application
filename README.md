# Note-Taking API
A simple RESTful API for managing notes with basic CRUD operations.


## Live-Link

- ### https://notetaking-app-xny7.onrender.com/

## Features

- Create, read, update, and delete notes
- In-memory storage (no database required)
- Error handling middleware
- Simple frontend interface

## API Endpoints

| Method | Endpoint    | Description                |
|--------|-------------|----------------------------|
| GET    | /notes      | Get all notes              |
| POST   | /notes      | Create a new note          |
| GET    | /notes/:id  | Get a specific note        |
| PUT    | /notes/:id  | Update a note              |
| DELETE | /notes/:id  | Delete a note              |

## Request/Response Examples

**Create Note:**
```json
POST /notes
{
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Programming Lang",
  "content": "C, C++, Python",
  "createdAt": "2023-05-20T12:00:00.000Z"
}
```

## Installation & Usage

1. Clone the repository
2. Install dependencies: `npm install express`
3. Start the server: `node app.js` (or your entry file)
4. Access the API at `http://localhost:3000`
