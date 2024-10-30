interface Notes {
  id: number;
  note: string;
  important: false;
}

const list = document.getElementById("list") as HTMLUListElement;

class NotesDo {
  private notes: Notes[] = [];
  private nextId: number = 1;

  //create the methods
  addNotes(note: string) {
    const newNote: Notes = {
      id: this.nextId++,
      note,
      important: false,
    };
    this.notes.push(newNote);
    this.renderNotes();
  }
  editById(note: string, id: number) {
    const newNote = this.notes.find((note) => note.id === id);
    if (newNote) {
      newNote.note = note;
    }
    this.renderNotes();
  }
  renderNotes() {
    list.innerHTML = "";
    this.notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note.note;
    });
  }
}
