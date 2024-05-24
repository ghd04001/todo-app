const createBtn = document.getElementById("create-btn");
const list = document.getElementById("list");

let todos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
  //Create a new item object
  const item = {
    id: new Date().getTime(), //1690604133472
    text: "",
    complete: false,
  };

  //Add a new item to the beginning of the array
  todos.unshift(item);

  //Create element
  const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

  //Add the just created item element to the list element (add it as the first element)
  list.prepend(itemEl);

  //Remove disabled attribute
  inputEl.removeAttribute("disabled");

  //Focus on input element
  inputEl.focus();

  saveToLocalStorage();
}

//Function to create elements
function createTodoElement(item) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("material-icons");
  editBtnEl.innerText = "edit";

  const removeBtnEl = document.createElement("button");
  removeBtnEl.classList.add("material-icons", "remove-btn");
  removeBtnEl.innerText = "remove_circle";

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  //EVENTS
  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }

    saveToLocalStorage();
  });

  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
  });

  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");

    saveToLocalStorage();
  });

  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  removeBtnEl.addEventListener("click", () => {
    todos = todos.filter((t) => t.id != item.id); //Remove data
    itemEl.remove(); // Remove element

    saveToLocalStorage();
  });

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function displayTodos() {
  loadFromLocalStorage();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const { itemEl } = createTodoElement(item);

    list.append(itemEl);
  }
}

displayTodos();

function saveToLocalStorage() {
  const data = JSON.stringify(todos);

  localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("my_todos");

  if (data) {
    todos = JSON.parse(data);
  }
}
