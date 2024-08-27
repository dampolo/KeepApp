class Notebook {
    constructor() {
        this.notes = [];
    }


    addNoteToArray(note){
        this.notes.push(note);
    }


    addNoteToTrash(id) {
        const index = currentList.notes.findIndex(note => note.id === id);
        this.addNoteToArray(currentList.notes[index]);
    }
    
    removeFormCurrentList(id) {
        const index = currentList.notes.findIndex(note => note.id === id);
        if (index !== -1) {
            currentList.notes.splice(index, 1);
            setTimeout(() => {
                alert("Note deleted successfully");
            }, 100);
        } else {
            alert("Note not found");
        }
    }


    deleteTrashFromTrash(id) {
        const index = trash.notes.findIndex(note => note.id === id);
        trash.notes.splice(index, 1);
    }


    restoreTrash(id) {
        const index = trash.notes.findIndex(note => note.id === id);
        this.addNoteToArray(trash.notes[index]);
    }

    
    removeFromTrash(id) {
        const index = trash.notes.findIndex(note => note.id === id);
        if (index !== -1) {
            trash.notes.splice(index, 1);
            setTimeout(() => {
                alert("Note restored successfully");
            }, 100);
        } else {
            alert("Note not found");
        }
    }
}



