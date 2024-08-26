class Notebook {
    constructor() {
        this.notes = [];
    }

    addNoteToArray(note){
        this.notes.push(note);
    }

    goToTrash(id) {
        trash.addNoteToArray(id);
        this.remove(id);
    }

    remove(id) {
        const index = currentList.notes.indexOf(id);
        currentList.notes.splice(index, 1);
    }
}



