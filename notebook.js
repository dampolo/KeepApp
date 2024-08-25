class Notebook {
    constructor() {
        this.notes = [];
    }

    addNoteToArray(note){
        this.notes.push(note);
    }
}


const currentList = new Notebook();
const trash = new Notebook();
const archive = new Notebook();



