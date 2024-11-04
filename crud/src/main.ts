interface Crud {
  resource: string;
  id: number;
}

const input = document.getElementById("input") as HTMLInputElement;
const button = document.getElementById("submit") as HTMLButtonElement;
const display = document.getElementById("display") as HTMLDivElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

const tasks: Crud[] = [];
let nextId: number = 1;

function create(resource: string): Crud {
  const newTask: Crud = {
    resource,
    id: nextId++,
  };
  tasks.push(newTask);
  console.log(newTask);
  return newTask;
}

function update(id: number, resource: string): Crud | null {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.resource = resource;
    return task;
  }
  return null;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Task id: ${task.id}, Resource is ${task.resource}`;
  });
}

button.addEventListener("click", () => {
  const newInput = input.value;
  const createdTask = create(newInput);
});
