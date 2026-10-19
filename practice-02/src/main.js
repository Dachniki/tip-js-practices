import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

let currentTasks = demoTasks;
console.log("Исходные названия:", getTaskTitles(currentTasks));
console.log("Невыполненные задачи:", getPendingTasks(currentTasks));
console.log("Исходная сводка:", getTaskStats(currentTasks));

let res = addTask(currentTasks, 20, "Добавить проверку", "high");
if (res.ok) currentTasks = res.tasks;

res = setTaskCompleted(currentTasks, 4, true);
if (res.ok) currentTasks = res.tasks;

res = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (res.ok) currentTasks = res.tasks;

res = removeTask(currentTasks, 7);
if (res.ok) currentTasks = res.tasks;

console.log("\nИтоговая сводка:", getTaskStats(currentTasks));
console.log("Демонстрация отказа (повторный ID):");
const failRes = addTask(currentTasks, 20, "Дубликат", "low");
console.log("Результат отказа:", failRes);
console.log("Исходные demoTasks не изменились (длина):", demoTasks.length);

let vTasks = variantTasks;
console.log("Начальная сводка варианта:", getTaskStats(vTasks));

res = addTask(vTasks, 80, "Подготовить раздаточные материалы", "high");
if (res.ok) vTasks = res.tasks;

res = setTaskCompleted(vTasks, 11, true);
if (res.ok) vTasks = res.tasks;

res = renameTask(vTasks, 23, "Согласовать тему и забронировать аудиторию");
if (res.ok) vTasks = res.tasks;

res = removeTask(vTasks, 37);
if (res.ok) vTasks = res.tasks;

const failVariant = addTask(vTasks, 80, "Повтор 80", "medium");
console.log("Отказ в варианте (повтор ID=80):", failVariant.error);

const stats = getTaskStats(vTasks);
console.log(`Итоговый прогресс варианта: ${stats.progress.toFixed(1)}%`);
console.log("Сохранность variantTasks (длина):", variantTasks.length);