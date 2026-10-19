"use strict";

console.log("Эксперимент 1: Вызов функции с разными типами");
function sum(a, b) {
  return a + b;
}
console.log("sum(5, 10):", sum(5, 10), typeof sum(5, 10));
console.log("sum('5', 10):", sum("5", 10), typeof sum("5", 10));

console.log("\nЭксперимент 2: Стрелочная функция с телом");
const square = (x) => {
  return x * x;
};
console.log("square(4):", square(4));

console.log("\nЭксперимент 3: Ссылки на объекты");
const objA = { name: "Семинар" };
const objB = objA;
objB.name = "Обновленный семинар";
console.log("objA.name:", objA.name);
console.log("objA === objB:", objA === objB);

console.log("\nЭксперимент 4: Копирование массива через Spread");
const listA = [{ id: 1 }, { id: 2 }];
const listB = [...listA];
listB.push({ id: 3 });
listB[0].id = 99;
console.log("listA length:", listA.length, "listB length:", listB.length);
console.log("listA[0].id:", listA[0].id);

console.log("\nЭксперимент 5: Spread объекта и порядок полей");
const task = { id: 1, title: "Тест", completed: false };
const updatedTask = { ...task, completed: true };
console.log("task.completed:", task.completed);
console.log("updatedTask.completed:", updatedTask.completed);

console.log("\nЭксперимент 6: Параметры по умолчанию");
function greet(name = "Гость") {
  return `Привет, ${name}!`;
}
console.log("greet():", greet());
console.log("greet(undefined):", greet(undefined));
console.log("greet(null):", greet(null));
console.log("greet(''):", greet(""));