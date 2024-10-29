interface Task {
  id: number;
  text: string;
  completed: boolean;
}

//dom!
const input = document.getElementById("taskInput") as HTMLInputElement;
const button = document.getElementById("buttonInput") as HTMLButtonElement;
const list = document.getElementById("tasksList") as HTMLUListElement;

class ToDoList {
  private tasks: Task[] = [];
  private nextId: number = 1;

  //methods
  //create a resource
  addTask(text: string) {
    const newTask: Task = {
      id: this.nextId++,
      text,
      completed: false,
    };
    this.tasks.push(newTask);
    this.renderTasks();
    console.log(newTask.id);
  }

  //remove a resource
  removeTaskById(id: number) {
    this.tasks = this.tasks.filter((todo) => todo.id !== id);
    this.renderTasks();
  }

  //update the resource
  updateTask(id: number, updatedText: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.text = updatedText;
      this.renderTasks();
    }
  }

  //read all of the tasks
  //means display all of the tasks
  renderTasks() {
    list.innerHTML = "";
    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        this.removeTaskById(task.id);
      });

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", () => {
        const newText = prompt("Update task:", task.text);
        if (newText !== null && newText.trim() !== "") {
          this.updateTask(task.id, newText);
        }
      });

      li.appendChild(removeButton);
      li.appendChild(updateButton);
      list.appendChild(li);
    });
  }
}

const toDoList = new ToDoList();

button.addEventListener("click", () => {
  const taskText = input.value;
  toDoList.addTask(taskText);
});
