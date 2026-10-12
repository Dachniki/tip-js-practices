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
