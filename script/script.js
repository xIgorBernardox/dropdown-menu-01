// Manipulando dados
let todoList = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

const add = (task = "") => {
  todoList.push(task);
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const remove = (index) => {
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

// Manipulando DOM
const todoForm = document.querySelector(".todoForm");
const todoBody = document.querySelector(".todo-table tbody");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = todoForm.todoInput;
  add(input.value);
  mountList(todoList);
  input.value = "";
});

const mountList = (list = []) => {
  todoBody.innerHTML = "";

  list.forEach((todo, index) => {
    todoBody.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td>
          <span>${todo}</span>
        </td>
        <td>
          <button class="remove-button" data-task="${index}">Remover</button>
        </td>
      </tr>`
    );
  });

  handleRemoveClick();
};

const handleRemoveClick = () => {
  document.querySelectorAll(`.remove-button`).forEach((button) => {
    button.addEventListener("click", () => {
      remove(button.dataset.task);
      mountList(todoList);
    });
  });
};

mountList(todoList);
