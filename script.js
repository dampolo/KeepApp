const currentList = new Notebook();
const trash = new Notebook();
const archive = new Notebook();

// loadNoteFromLocalStorage();
// loadTrashFromLocalStorage();

function toggleNewNoteInput() {
  document.querySelector(".card-write").classList.remove("d-none");
}

function render() {
  document.getElementById("title").innerHTML = `MyKEEP`;
  document.getElementById("my-keep").classList.add("box-shadow");
  document.getElementById("new-input").classList.remove("d-none");
  document.getElementById("trash-header").classList.remove("box-shadow");

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

function deleteTrashFromTrashCompletely(id) {
  trash.deleteTrashFromTrash(id)
  renderTrash();
  // saveTrashInLocalStorage();
}


// Save note in local storage.
function saveNoteInLocalStorage() {
  let currentListAsText = JSON.stringify(currentList);
  localStorage.setItem("currentList", currentListAsText);
}


function addDeletedNoteToMyKeepArrayAgain(id) {
  currentList.restoreTrash(id)
  trash.removeFromTrash(id)
  renderTrash();
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
  trash.addNoteToTrash(id)
  currentList.removeFormCurrentList(id)
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

  trash.notes.forEach((trash) => {

    content.innerHTML += /*html*/ `
        <div class="new-input-container-saved">
            <div class="new-input-saved">
                <div class="new-title-saved" type="text">${trash.title}</div>
            </div>
            <div class="card-write">    
                <div class="new-note-saved">${trash.description}</div>
                <div class="button-save-close">
                <img class="img-header" src="img/arrow-back-up-double.svg" alt="arrow-back-up-double" onclick="addDeletedNoteToMyKeepArrayAgain('${trash.id}')">
                <button class="button-delete" onclick="deleteTrashFromTrashCompletely('${trash.id}')">DELETE</button>
                </div>  
            </div>
        </div>
       `;
});
}

function addClasses() {
  document.getElementById("title").innerHTML = `Trash`;
  document.getElementById("new-input").classList.add("d-none");
  document.getElementById("trash-header").classList.add("box-shadow");
  document.getElementById("my-keep").classList.remove("box-shadow");
  document.getElementById("my-keep").classList.remove("add-my-keep");
  document.getElementById("my-keep").classList.remove("my-keep");

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
