const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const ClearBtn = document.getElementById("clear-btn") as HTMLButtonElement;
const todolist = document.getElementById("todolist") as HTMLUListElement;

interface ITodo {
    id: string;
    title: string;
    isComplete: boolean;
}

let todos: ITodo[] = JSON.parse(localStorage.getItem("todos") ?? "[]");

const handleSubmit = (event: Event) => {
    event.preventDefault();

    if (!todoInput.value) return;

    const newTodo: ITodo = {
        id: crypto.randomUUID(),
        title: todoInput.value,
        isComplete: false,
    };

    addTodoToDom(newTodo);
    todos.push(newTodo);
    saveTodosInLocalStorage(todos);

    todoInput.value = "";
    todoInput.focus();
};

const addTodoToDom = (todo: ITodo) => {
    todolist.insertAdjacentHTML(
        "beforeend",
        `<li class="todo-item">${todo.title} <span class="remove-btn" onclick="removeTodo('${todo.id}')">🗑️</i></span></li>`
    );
};

const saveTodosInLocalStorage = (todos: ITodo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodo = (todoId: string) => {
    todos = todos.filter((todo) => todo.id != todoId);
    saveTodosInLocalStorage(todos);
    todolist.innerHTML = "";
    todos.forEach((todo) => addTodoToDom(todo));
};

const addTodosToDom = (todos: ITodo[]) => {
    todos.forEach((todo) => addTodoToDom(todo));
};

const clearAllTodosHandler = () => {
    todos = [];
    todolist.innerHTML = "";
    saveTodosInLocalStorage(todos);
};

window.addEventListener("DOMContentLoaded", () => addTodosToDom(todos));
addBtn.addEventListener("click", (event) => handleSubmit(event));
ClearBtn.addEventListener("click", () => clearAllTodosHandler());
