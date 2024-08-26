const currentList = new Notebook();
const trash = new Notebook();
const archive = new Notebook();

let titleTrashes = [];
let newNoteTrashes = [];
let idTrashes = [];

// loadNoteFromLocalStorage();
// loadTrashFromLocalStorage();

function toggleNewNoteInput() {
  document.querySelector(".card-write").classList.remove("d-none");
}

function render() {
  let content = document.getElementById("new-content");
  content.innerHTML = "";

  currentList.notes.forEach((newNoteObject) => {
    content.innerHTML += /*html*/ `
        <div class="new-input-container-saved">
            <div class="new-input-saved">
                <div class="new-title-saved" type="text"><b>${newNoteObject.title}</b></div>
            </div>
            <div class="card-write">    
                <div class="new-note-saved">${newNoteObject.description}</div>
                <div class="button-save-close">
                <button class="button-delete" onclick="addNoteToTrashArray('${newNoteObject.id}')">DELETE</button>
                </div>  
            </div>
        </div>
       `;
  });
}

function deleteTrashFromTrashCompletely(i) {
  titleTrashes.splice(i, 1);
  newNoteTrashes.splice(i, 1);
  idTrashes.splice(i, 1);

  renderTrash();
  // saveTrashInLocalStorage();
}

// Save note in local storage.
function saveNoteInLocalStorage() {
  let currentListAsText = JSON.stringify(currentList);
  localStorage.setItem("currentList", currentListAsText);
}

function addDeletedNoteToMyKeepArrayAgain(i) {
  currentList.addNoteToArray(new Task(idTrashes[i], titleTrashes[i], newNoteTrashes[i]));
  
  deleteTrashFromTrashCompletely(i);
  // saveNoteInLocalStorage();
}

// Load note from local sorage.
function loadNoteFromLocalStorage() {
  let currentListAsText = localStorage.getItem("currentList");

  if (currentListAsText) {
    const currentListFromStorage = JSON.parse(currentListAsText);

    for (let i = 0; i < currentListFromStorage.notes.length; i++) {
      const index = currentListFromStorage.notes[i];

      currentList.addNoteToArray(new Task(index.id, index.title, index.description));
    }
  }
}


// Add note to trash array.
function addNoteToTrashArray(id) {
  debugger
  currentList.goToTrash(id)
  render()
  // saveTrashInLocalStorage();
}

// Save trash in local storage array.
function saveTrashInLocalStorage() {
  let titleTrashAsText = JSON.stringify(titleTrashes);
  let newNoteTrashAsText = JSON.stringify(newNoteTrashes);
  let idTrashAsText = JSON.stringify(idTrashes);

  localStorage.setItem("titleTrashes", titleTrashAsText);
  localStorage.setItem("newNoteTrashes", newNoteTrashAsText);
  localStorage.setItem("idTrashes", idTrashAsText);
}

// Load trash from local storage array.
function loadTrashFromLocalStorage() {
  let titleTrashAsText = localStorage.getItem("titleTrashes");
  let newNoteTrashAsText = localStorage.getItem("newNoteTrashes");
  let idTrashAsText = localStorage.getItem("idTrashes");

  if (titleTrashAsText && newNoteTrashAsText) {
    titleTrashes = JSON.parse(titleTrashAsText);
    newNoteTrashes = JSON.parse(newNoteTrashAsText);
    idTrashes = JSON.parse(idTrashAsText);
  }
}

// Render trash = load again the trash
function renderTrash() {
  addClasses();

  let content = document.getElementById("new-content");
  content.innerHTML = "";

  for (let i = 0; i < titleTrashes.length; i++) {
    const titleTrash = titleTrashes[i];
    const newNoteTrash = newNoteTrashes[i];

    content.innerHTML += /*html*/ `
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
  document.getElementById("title").innerHTML = `Trash`;
  document.getElementById("new-input").classList.add("d-none");
  document.getElementById("trash-header").classList.add("box-shadow");
  document.getElementById("my-keep").classList.remove("my-keep");
  document.getElementById("my-keep").classList.add("add-my-keep");
  document
    .getElementById("new-content-container-height")
    .classList.add("new-content-container-footer-trash");
}

function archiv() {
  alert("Die Seite ist noch in der Bearbeitung.");
}

document.querySelector(".button-save").addEventListener("click", () => {
  const title = document.getElementById("new-title");
  const description = document.getElementById("new-note");
  const idGenerator = new IdGenerator();
  if (title.value == "" || description.value == "") {
    alert("Please enter a title and a note.");
  } else {
    currentList.addNoteToArray(
      new Task(idGenerator.getId(), title.value, description.value)
    );
  }
  title.value = "";
  description.value = "";
  render();
  // saveNoteInLocalStorage();
});
