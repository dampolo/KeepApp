class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

document.querySelector(".button-save").addEventListener("click", () => {
  let title = document.getElementById("new-title");
  let description = document.getElementById("new-note");

  if (title.value == "" || description.value == "") {
    alert("Please enter a title and a note.");
  } else {
    globalNotes.push(new Task(title.value, description.value));
  }
  title.value = "";
  description.value = "";
  render();
  saveNoteInLocalStorage();
});
