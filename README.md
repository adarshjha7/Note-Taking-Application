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

## Screenshots
  <img width="1920" height="1080" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/3993b499-8a08-4e46-892f-4eeeaf2ed863" />

<img width="1920" height="1080" alt="Screenshot (119)" src="https://github.com/user-attachments/assets/100aeb8d-03f5-457a-bf37-291b60a0ea1f" />

<img width="1920" height="1080" alt="Screenshot (120)" src="https://github.com/user-attachments/assets/50932a4e-7e13-4af4-aad1-abe99b987601" />
