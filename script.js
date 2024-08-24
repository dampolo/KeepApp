let titles = [];
let newNotes = [];
let titleTrashes = [];
let newNoteTrashes = [];

loadNoteFromLocalStorage();
loadTrashFromLocalStorage();

function toggleNewNoteInput() {
    document.querySelector('.card-write').classList.toggle('d-none')
}


function render() {
    // document.getElementById('my-keep').classList.add('box-shadow');
    let content = document.getElementById('new-content');
    content.innerHTML = "";

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const newNote = newNotes[i];

        content.innerHTML += 
        /*html*/ `
        <div class="new-input-container-saved">
            <div class="new-input-saved">
                <div class="new-title-saved" type="text"><b>${title}</b></div>
            </div>
            <div class="card-write">    
                <div class="new-note-saved">${newNote}</div>
                <div class="button-save-close">
                    <button class="button-delete" onclick="addNoteToTrashArray(${i})">DELETE</button>
                </div>  
            </div>
        </div>
       `;
    }
}


function addNote() {
    let title = document.getElementById('new-title');
    let newNote = document.getElementById('new-note');

    if(title.value == "" || newNote.value == "") {
        alert ("Bitte geben Sie einen Titel und eine Notiz ein.")
    } else {
        titles.push(title.value);
        newNotes.push(newNote.value);
    
        document.getElementById('new-title').value = "";
        document.getElementById('new-note').value = "";
        render();
        saveNoteInLocalStorage();
    }
}


function deleteNote(i) {
    titles.splice(i, 1);
    newNotes.splice(i, 1);
    render();
    saveNoteInLocalStorage();
}


function deleteTrashFromTrashCompletely(i) {
    titleTrashes.splice(i, 1);
    newNoteTrashes.splice(i, 1);
    renderTrash();
    saveTrashInLocalStorage();
}


// Save note in local storage.
function saveNoteInLocalStorage() {
    let titleAsText = JSON.stringify(titles);
    let newNotesAsText = JSON.stringify(newNotes);

    localStorage.setItem('titles', titleAsText);
    localStorage.setItem('newNotes', newNotesAsText);
}


function addDeletedNoteToMyKeepArrayAgain(i) {
    titles.push(titleTrashes[i]);
    newNotes.push(newNoteTrashes[i]);
    deleteTrashFromTrashCompletely(i)
    saveNoteInLocalStorage()
}


// Load note from local sorage.
function loadNoteFromLocalStorage() {
    let titleAsText = localStorage.getItem('titles');
    let newNotesAsText = localStorage.getItem('newNotes');

    if (titleAsText && newNotesAsText) {
        titles = JSON.parse(titleAsText);
        newNotes = JSON.parse(newNotesAsText)
    }
}


// Add note to trash array.
function addNoteToTrashArray(i) {
    titleTrashes.push(titles[i]);
    newNoteTrashes.push(newNotes[i]);
    deleteNote(i);
    saveTrashInLocalStorage();
}


// Save trash in local storage array.
function saveTrashInLocalStorage() {
    let titleTrashAsText = JSON.stringify(titleTrashes);
    let newNoteTrashAsText = JSON.stringify(newNoteTrashes);

    localStorage.setItem('titleTrashes', titleTrashAsText);
    localStorage.setItem('newNoteTrashes', newNoteTrashAsText);
}


// Load trash from local storage array.
function loadTrashFromLocalStorage() {
    let titleTrashAsText = localStorage.getItem('titleTrashes');
    let newNoteTrashAsText = localStorage.getItem('newNoteTrashes');

    if (titleTrashAsText && newNoteTrashAsText) {
        titleTrashes = JSON.parse(titleTrashAsText);
        newNoteTrashes = JSON.parse(newNoteTrashAsText);    
    }
}


// Render trash = load again the trash
function renderTrash() {
    addClasses() 
   
    let content = document.getElementById('new-content');
    content.innerHTML = "";

    for (let i = 0; i < titleTrashes.length; i++) {
        const titleTrash = titleTrashes[i];
        const newNoteTrash = newNoteTrashes[i];

        content.innerHTML += 
        /*html*/ `
        <div class="new-input-container-saved">
            <div class="new-input-saved">
                <div class="new-title-saved" type="text">${titleTrash}</div>
            </div>
            <div class="card-write">    
                <div class="new-note-saved">${newNoteTrash}</div>
                <div class="button-save-close">
                <img class="img-header" src="img/arrow-back-up-double.svg" alt="arrow-back-up-double" onclick="addDeletedNoteToMyKeepArrayAgain(${i})">
                <button class="button-delete" onclick="deleteTrashFromTrashCompletely(${i})">DELETE</button>
                </div>  
            </div>
        </div>
       `;
    }
}


function addClasses() {
    document.getElementById('title').innerHTML = `Trash`;
    document.getElementById('input').classList.add('d-none');
    document.getElementById('new-input').classList.remove('add-new-input');
    document.getElementById('trash-header').classList.add('box-shadow');
    document.getElementById('my-keep').classList.remove('my-keep');
    document.getElementById('my-keep').classList.add('add-my-keep');
    document.getElementById('new-content-container-height').classList.add('new-content-container-footer-trash')
}


function archiv() {
    alert("Die Seite ist noch in der Bearbeitung.")
}