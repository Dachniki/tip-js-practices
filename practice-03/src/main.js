import { demoTasks, variantTasks } from "./data.js";
import {
  findTaskById,
  getTaskStats,
  setTaskCompleted,
  removeTask,
} from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import {
  renderTaskList,
  renderSummary,
  renderEmptyState,
} from "./task-view.js";

const params = new URLSearchParams(window.location.search);
const dataset = params.get("dataset") === "variant" ? variantTasks : demoTasks;

let currentTasks = dataset.map((task) => ({ ...task }));
let currentFilter = "all";

const listElement = document.querySelector("#task-list");
const summaryElement = document.querySelector("#task-summary");
const emptyElement = document.querySelector("#empty-message");
const messageElement = document.querySelector("#operation-message");
const filtersElement = document.querySelector("#task-filters");

const datasetLabel = document.querySelector("#dataset-label");
if (datasetLabel) {
  datasetLabel.textContent = params.get("dataset") === "variant" ? "Свой вариант" : "Общий набор";
}

function restoreTaskFocus(id, action) {
  const selector = `li[data-task-id="${id}"] button[data-action="${action}"]`;
  const next = document.querySelector(selector);
  if (next) {
    next.focus();
    return;
  }
  const activeFilter = document.querySelector("#task-filters .is-active");
  if (activeFilter) {
    activeFilter.focus();
  }
}

function renderApp() {
  const visible = getVisibleTasks(currentTasks, currentFilter);
  renderTaskList(listElement, visible);
  renderSummary(summaryElement, currentTasks, visible.length);
  renderEmptyState(emptyElement, currentTasks.length, visible.length);

  const buttons = filtersElement.querySelectorAll("button[data-filter]");
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  if (!button || !listElement.contains(button)) return;

  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

  const id = Number(card.dataset.taskId);
  if (!Number.isSafeInteger(id) || id <= 0) {
    messageElement.textContent = "Некорректный идентификатор задачи.";
    return;
  }

  let result;

  if (action === "toggle") {
    const task = findTaskById(currentTasks, id);
    if (!task) {
      messageElement.textContent = `Задача с id ${id} не найдена.`;
      return;
    }
    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else {
    result = removeTask(currentTasks, id);
  }

  if (!result.ok) {
    messageElement.textContent = result.error;
    return;
  }

  currentTasks = result.tasks;
  window.currentTasks = currentTasks; 
  messageElement.textContent = "";
  renderApp();
  restoreTaskFocus(id, action);
}

function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-filter]");
  if (!button || !filtersElement.contains(button)) return;

  const filter = button.dataset.filter;
  if (filter !== "all" && filter !== "pending" && filter !== "completed") {
    return;
  }

  currentFilter = filter;
  messageElement.textContent = "";
  renderApp();
}

listElement.addEventListener("click", handleTaskListClick);
filtersElement.addEventListener("click", handleFilterClick);

try {
  window.currentTasks = currentTasks; 
  renderApp();
} catch (err) {
  console.error(err);
  messageElement.textContent = `Ошибка запуска: ${err.message}`;
}