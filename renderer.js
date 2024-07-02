const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');
const saveNoteButton = document.getElementById('SaveNoteButton');
async function saveNote() {
  const note = noteInput.value;
  if (note) {
    console.log('Saving note:', note);
    window.electronAPI.saveNote(note);
    noteInput.value = '';
    loadNotes();
  }
}

async function loadNotes() {
  const notes = await window.electronAPI.loadNotes();
  console.log('Loaded notes:', notes);
  notesList.innerHTML = notes.map(note => `<li>${note}</li>`).join('');
}

saveNoteButton.addEventListener('click', saveNote);

loadNotes();
