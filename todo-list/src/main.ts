interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const input = document.getElementById("taskInput") as HTMLInputElement;
const button = document.getElementById("buttonInput") as HTMLButtonElement;
const list = document.getElementById("tasksList") as HTMLUListElement;

class ToDoList {
  private tasks: Task[] = [];
  private nextId: number = 1;

  //methods
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

  removeTaskById(id: number) {
    this.tasks = this.tasks.filter((todo) => todo.id !== id);
    this.renderTasks();
  }

  getTask() {
    return this.tasks;
  }
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
      li.appendChild(removeButton);
      list.appendChild(li);
    });
  }
}

const toDoList = new ToDoList();

button.addEventListener("click", () => {
  const taskText = input.value;
  toDoList.addTask(taskText);
});
