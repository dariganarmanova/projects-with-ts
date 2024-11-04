interface Crud {
  resource: string;
  id: number;
}

const input = document.getElementById("input") as HTMLInputElement;
const button = document.getElementById("submit") as HTMLButtonElement;
//const display = document.getElementById("display") as HTMLDivElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

let tasks: Crud[] = [];
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

function update(id: number, newResource: string): Crud | null {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.resource = newResource;
    return task;
  }
  return null;
}

function del(id: number): Crud | null {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  if (tasks.length < initialLength) {
    return { id, resource: "deleted task" };
  }
  return null;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Task id: ${task.id}, Resource is ${task.resource}`;
    const updatedButton = document.createElement("button") as HTMLButtonElement;
    updatedButton.textContent = "Update";
    updatedButton.addEventListener("click", () => {
      const newResource = prompt("Enter the new one", task.resource);
      if (newResource) {
        update(task.id, newResource);
        console.log("Updated task", newResource);
        renderTasks();
      }
    });
    const deleteButton = document.createElement("button") as HTMLButtonElement;
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      del(task.id);
      renderTasks();
    });
    listItem.appendChild(updatedButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

//for each li we append the button and each li we append to ul

button.addEventListener("click", () => {
  const newInput = input.value;
  create(newInput);
  renderTasks();
});

renderTasks();
