const noteForm = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');
const modal = document.getElementById('noteModal');
const closeBtn = document.querySelector('.close');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const editTitle = document.getElementById('editTitle');
const editContent = document.getElementById('editContent');

// const API_URL = 'http://localhost:3000/notes';
const API_URL = '/notes';

let currentNoteId = null;

noteForm.addEventListener('submit', handleFormSubmit);
closeBtn.addEventListener('click', closeModal);
updateBtn.addEventListener('click', updateNote);
deleteBtn.addEventListener('click', deleteNote);

document.addEventListener('DOMContentLoaded', () => {
    fetchNotes();
});

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch notes');
        
        const notes = await response.json();
        displayNotes(notes);
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching notes. Please try again.');
    }
}

function displayNotes(notes) {
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes yet. Add your first note!</p>';
        return;
    }
    
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-card';
        noteElement.innerHTML = `
            <div class="note-date">${formatDate(note.createdAt)}</div>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="note-actions">
                <button class="view-btn" data-id="${note.id}">View/Edit</button>
                <button class="delete-btn" data-id="${note.id}">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => openModal(e.target.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => confirmDelete(e.target.dataset.id));
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        
        if (!response.ok) throw new Error('Failed to create note');
        
        const newNote = await response.json();
        
        noteForm.reset();
        
        fetchNotes();
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating note. Please try again.');
    }
}

async function openModal(noteId) {
    try {
        const response = await fetch(`${API_URL}/${noteId}`);
        if (!response.ok) throw new Error('Failed to fetch note');
        
        const note = await response.json();
        
        currentNoteId = note.id;
        editTitle.value = note.title;
        editContent.value = note.content;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading note. Please try again.');
    }
}

function closeModal() {
    modal.style.display = 'none';
    currentNoteId = null;
}

async function updateNote() {
    const title = editTitle.value;
    const content = editContent.value;
    
    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${currentNoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        
        if (!response.ok) throw new Error('Failed to update note');
        
        closeModal();
        fetchNotes();
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating note. Please try again.');
    }
}

function confirmDelete(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        deleteNoteFromAPI(noteId);
    }
}

async function deleteNoteFromAPI(noteId) {
    try {
        const response = await fetch(`${API_URL}/${noteId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete note');
        
        // If we're viewing the note in the modal, close it
        if (currentNoteId === parseInt(noteId)) {
            closeModal();
        }
        
        fetchNotes();
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting note. Please try again.');
    }
}

function deleteNote() {
    if (currentNoteId) {
        confirmDelete(currentNoteId);
    }
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});