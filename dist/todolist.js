"use strict";
var _a;
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const ClearBtn = document.getElementById("clear-btn");
const todolist = document.getElementById("todolist");
let todos = JSON.parse((_a = localStorage.getItem("todos")) !== null && _a !== void 0 ? _a : "[]");
const handleSubmit = (event) => {
    event.preventDefault();
    if (!todoInput.value)
        return;
    const newTodo = {
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
const addTodoToDom = (todo) => {
    todolist.insertAdjacentHTML("beforeend", `<li class="todo-item">${todo.title} <span class="remove-btn" onclick="removeTodo('${todo.id}')">🗑️</i></span></li>`);
};
const saveTodosInLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const removeTodo = (todoId) => {
    todos = todos.filter((todo) => todo.id != todoId);
    saveTodosInLocalStorage(todos);
    todolist.innerHTML = "";
    todos.forEach((todo) => addTodoToDom(todo));
};
const addTodosToDom = (todos) => {
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
