РТУ МИРЭА<br>
Технологии индустриального программирования<br>
ОТЧЁТ ПО ПРАКТИЧЕСКИМ РАБОТАМ № 1–3<br>
Основы JavaScript, функции и работа с DOM<br>
Студент: Никита Щеглов<br>
Группа: ЭФБО-12-25 <br>
Вариант: 3<br>
Дата выполнения: 19.10.2026<br>
Примечание: отчёт составлен по материалам README и исходному коду проекта из предоставленного архива. Скриншоты, требующие запуска приложения в браузере, оставлены как места для вставки фактических изображений.<br>
1. Практическая работа № 1. Основы JavaScript и отладка<br>
Цель работы — освоить базовые конструкции JavaScript, работу с типами данных и функциями, а также получить навыки отладки кода.<br>
По README проекта указан вариант 3: totalTasks = 9, completedTasks = 9, dailyLimit = 3. В качестве окружения указаны Windows 11, Node.js 24.21.0, npm 11.19.0 и Git 2.56.0.windows.2.<br>
В проекте находятся скрипты hello.js, types.js, plan.js, progress.js и debug.js. Они предназначены для изучения вывода сообщений, типов и преобразования данных, расчётов и отладки.<br>
Листинг 1. progress.js<br>
"use strict";



const totalTasks = 9;

const completedTasks = 9;



const isNumber = (value) => typeof value === "number" && !Number.isNaN(value);

const isInteger = (value) => Number.isInteger(value);



if (!isNumber(totalTasks) || !isNumber(completedTasks)) {

    console.log("Ошибка: значения должны быть числами.");

} else if (!isInteger(totalTasks) || !isInteger(completedTasks)) {

    console.log("Ошибка: значения должны быть целыми числами.");

} else if (totalTasks < 0 || completedTasks < 0) {

    console.log("Ошибка: количество не может быть отрицательным.");

} else if (totalTasks > 1000) {

    console.log("Ошибка: превышена верхняя граница (1000).");

} else if (completedTasks > totalTasks) {

    console.log("Ошибка: выполнено больше, чем существует.");

} else if (totalTasks === 0 && completedTasks === 0) {

    console.log("Задач пока нет.");

} else {

    const remaining = totalTasks - completedTasks;

    const percent = (completedTasks / totalTasks) * 100;



    let status;

    if (completedTasks === 0) {

        status = "Не начато";

    } else if (completedTasks === totalTasks) {

        status = "Завершено";

    } else {

        status = "В работе";

    }



    console.log(`Всего задач: ${totalTasks}`);

    console.log(`Выполнено: ${completedTasks}`);

    console.log(`Осталось: ${remaining}`);

    console.log(`Прогресс: ${percent.toFixed(1)}%`);

    console.log(`Статус: ${status}`);

}


Результат для данных варианта: всего 9 задач, выполнено 9; выполнение составляет 100%, остаток — 0. Для подтверждения запуска следует вставить скриншот терминала с фактическим выводом скрипта.
Скриншот 1. Фактический вывод запуска progress.js в Node.js:

2. Практическая работа № 2. Функции, объекты, массивы и организация кода
Цель работы — изучить функции, ссылки на объекты, поверхностное копирование массивов и объектов, значения параметров по умолчанию и разделение проекта на модули.
Модель задачи содержит поля id (число), title (строка), completed (логическое значение) и priority (high, medium или low). В task-service.js собраны функции создания, поиска, отбора, подсчёта статистики и изменения набора задач.
Листинг 2. Фрагмент сервиса задач
const PRIORITIES = ["high", "medium", "low"];



export function createTask(id, title, priority = "medium") {

  if (!Number.isInteger(id) || id <= 0) {

    return { ok: false, error: "id должен быть целым положительным числом" };

  }



  if (typeof title !== "string" || title.trim() === "") {

    return { ok: false, error: "title должен быть непустой строкой" };

  }



  if (!PRIORITIES.includes(priority)) {

    return { ok: false, error: `priority должен быть одним из: ${PRIORITIES.join(", ")}` };

  }



  return {

    ok: true,

    task: {

      id,

      title: title.trim(),

      completed: false,

      priority,

    },

  };

}



export function findTaskById(tasks, id) {

  return tasks.find((task) => task.id === id);

}



export function getPendingTasks(tasks) {

  return tasks.filter((task) => !task.completed);

}



export function getTaskTitles(tasks) {

  return tasks.map((task) => task.title);

}



export function getTaskStats(tasks) {

  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 1000) / 10;



  return { total, completed, pending, progress };

}



export function addTask(tasks, id, title, priority = "medium") {

  if (!Array.isArray(tasks)) {

    return { ok: false, error: "tasks должен быть массивом" };

  }



  if (findTaskById(tasks, id) !== undefined) {

    return { ok: false, error: `Задача с id ${id} уже существует` };

  }



  const created = createTask(id, title, priority);

  if (!created.ok) {

    return created;

  }



  return { ok: true, tasks: [...tasks, created.task] };

}



export function setTaskCompleted(tasks, id, completed) {

  if (!Array.isArray(tasks)) {

    return { ok: false, error: "tasks должен быть массивом" };

  }



  if (typeof completed !== "boolean") {

    return { ok: false, error: "completed должен быть boolean" };

  }



  if (findTaskById(tasks, id) === undefined) {

    return { ok: false, error: `Задача с id ${id} не найдена` };

  }



  const next = tasks.map((task) =>

    task.id === id ? { ...task, completed } : task

  );



  return { ok: true, tasks: next };

}



export function renameTask(tasks, id, title) {

  if (!Array.isArray(tasks)) {

    return { ok: false, error: "tasks должен быть массивом" };

  }



  if (typeof title !== "string" || title.trim() === "") {

    return { ok: false, error: "title должен быть непустой строкой" };

  }



  if (findTaskById(tasks, id) === undefined) {

    return { ok: false, error: `Задача с id ${id} не найдена` };

  }



  const next = tasks.map((task) =>

    task.id === id ? { ...task, title: title.trim() } : task

  );



  return { ok: true, tasks: next };

}



export function removeTask(tasks, id) {

  if (!Array.isArray(tasks)) {

    return { ok: false, error: "tasks должен быть массивом" };

  }



  if (findTaskById(tasks, id) === undefined) {

    return { ok: false, error: `Задача с id ${id} не найдена` };

  }



  const next = tasks.filter((task) => task.id !== id);



  return { ok: true, tasks: next };

}
В README зафиксирован демонстрационный сценарий для шести задач варианта 3: исходно 6 задач, выполнено 2, осталось 4, прогресс 33.3%. После добавления id 80 — 7 задач и прогресс 28.6%; после установки completed=true для id 11 — прогресс 42.9%; после удаления id 37 — 6 задач, выполнено 3, осталось 3, прогресс 50.0%. Повторное добавление уже существующего id должно отклоняться без изменения исходного массива.
Для запуска из корня репозитория используются команды:
node practice-02/examples/functions-and-references.js
node practice-02/src/main.js
node practice-02/checks.js
В исходном README указано, что число пройденных проверок и фактический вывод checks.js нужно заполнить после запуска; поэтому они здесь не объявляются подтверждёнными.
Скриншот 2. Фактический вывод checks.js. В текущем проекте ПР2 обнаружены 5 неуспешных проверок; результаты показаны без исправления исходного кода:
Примечание: запуск checks.js завершился с ошибкой: 30 проверок пройдены, 5 не пройдены. Это реальный результат предоставленного архива, поэтому отчёт не скрывает обнаруженные проблемы.

3. Практическая работа № 3. Работа с DOM и событиями
Цель работы — научиться находить и изменять элементы DOM, обрабатывать события мыши, использовать dataset, делегирование событий и обновлять интерфейс на основе состояния приложения.
Проект разделён на модули: data.js хранит наборы данных; task-service.js содержит бизнес-логику; task-selectors.js выполняет фильтрацию; task-view.js отвечает за построение DOM; main.js управляет состоянием и обработчиками событий.
Листинг 3. Фрагмент логики приложения
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
Листинг 4. Фрагмент фильтрации задач
export function getVisibleTasks(tasks, filter = "all") {

  if (filter === "pending") {

    return tasks.filter((task) => !task.completed);

  }



  if (filter === "completed") {

    return tasks.filter((task) => task.completed);

  }



  return tasks.slice();

}
В README указаны результаты проверок: 35 сервисных проверок пройдены, ошибок 0; браузерные проверки — 36 пройдено, ошибок 0. Эти значения приведены как результаты, записанные в README проекта.
В общем демонстрационном сценарии исходно отображаются задачи id [1, 4, 7, 10], всего 4, выполнено 2, осталось 2, прогресс 50.0%. После выбора фильтра «В работе» отображаются [4, 7]. После отметки id 4 выполненной остаётся задача [7], а сводка показывает 4 / 3 / 1 / 75.0%.
Для запуска приложения в README указан npm start и адрес http://127.0.0.1:5503/. Для сервисных проверок — npm run check:service; браузерные проверки открываются через checks.html.
[МЕСТО ДЛЯ СКРИНШОТА: приложение после выбора фильтра «В работе» и завершения задачи id = 4]
Скриншот 3. Фактический вывод сервисных проверок ПР3:


4. Вывод
В ходе практических работ рассмотрены основы JavaScript, типы и функции, работа со ссылками и копированием объектов, построение сервиса для управления задачами, а также взаимодействие JavaScript с DOM. Разделение кода на модули позволяет отделить данные, бизнес-логику, фильтрацию, отображение и обработку событий. Иммутабельное обновление массивов помогает сохранять исходные данные и предсказуемо обновлять интерфейс.
Перед сдачей необходимо проверить ФИО и группу, указать дату, выполнить команды запуска на своём компьютере и вставить фактические скриншоты вместо текстовых мест-заполнителей.
