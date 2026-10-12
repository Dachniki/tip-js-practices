"use strict";

const totalTasks = 9;
const completedTasks = 9;
const dailyLimit = 3;

const isNumber = (value) => typeof value === "number" && !Number.isNaN(value);
const isInteger = (value) => Number.isInteger(value);

if (!isNumber(totalTasks) || !isNumber(completedTasks)) {
    console.log("Ошибка: значения задач должны быть числами.");
} else if (!isInteger(totalTasks) || !isInteger(completedTasks)) {
    console.log("Ошибка: значения задач должны быть целыми числами.");
} else if (totalTasks < 0 || completedTasks < 0) {
    console.log("Ошибка: количество задач не может быть отрицательным.");
} else if (totalTasks > 1000) {
    console.log("Ошибка: превышена верхняя граница количества задач (1000).");
} else if (completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше, чем существует.");
} else if (!isNumber(dailyLimit)) {
    console.log("Ошибка: дневная норма задана строкой.");
} else if (!isInteger(dailyLimit)) {
    console.log("Ошибка: дробной дневной нормы быть не должно.");
} else if (dailyLimit < 1 || dailyLimit > 1000) {
    console.log("Ошибка: превышена верхняя граница нормы.");
} else {
    let remaining = totalTasks - completedTasks;

    if (remaining === 0) {
        console.log("Все задачи уже выполнены.");
        console.log("Потребуется дней: 0");
    } else {
        console.log(`Осталось задач: ${remaining}`);

        let day = 0;
        while (remaining > 0) {
            day = day + 1;
            const doneToday = Math.min(dailyLimit, remaining);
            remaining = remaining - doneToday;
            console.log(`День ${day}: выполнено ${doneToday}, осталось ${remaining}`);
        }

        console.log(`Потребуется дней: ${day}`);
    }
}
