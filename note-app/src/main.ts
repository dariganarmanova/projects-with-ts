interface Notes {
  id: number;
  note: string;
  important: false;
}

const list = document.getElementById("list") as HTMLUListElement;
const addButton = document.getElementById("submit") as HTMLButtonElement;
const input = document.getElementById("notesInput") as HTMLInputElement;

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

  removeById(id: number) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.renderNotes();
  }

  renderNotes() {
    list.innerHTML = "";
    this.notes.forEach((note) => {
      const li = document.createElement("li");
      li.classList.add("li-class");
      li.textContent = note.note; //for each note we have a note

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", () => {
        const newNote = prompt("Enter the new note", note.note);
        if (newNote) {
          this.editById(newNote, note.id);
        }
      });

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");
      removeButton.addEventListener("click", () => {
        this.removeById(note.id);
      });

      li.appendChild(editButton);
      li.appendChild(removeButton);
      list.appendChild(li);
    });
  }
}

const notesInst = new NotesDo();

addButton.addEventListener("click", () => {
  const note = input.value;
  if (note) {
    notesInst.addNotes(note);
  } else {
    alert("Unable to add");
  }
});
