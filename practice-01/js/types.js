"use strict";

console.log("1. \"8\" + 2 ->", "8" + 2, "| Тип:", typeof ("8" + 2));

console.log("2. \"8\" - 2 ->", "8" - 2, "| Тип:", typeof ("8" - 2));

console.log("3. Number(\"8\") + 2 ->", Number("8") + 2, "| Тип:", typeof (Number("8") + 2));

console.log("4. \"12\" > \"3\" ->", "12" > "3", "| Тип:", typeof ("12" > "3"));

console.log("5. 12 === \"12\" ->", 12 === "12", "| Тип:", typeof (12 === "12"));

console.log("6. Number(\"\") ->", Number(""), "| Тип:", typeof Number(""));

console.log("7. Number(\"text\") ->", Number("text"), "| Тип:", typeof Number("text"));

console.log("8. Boolean(\"false\") ->", Boolean("false"), "| Тип:", typeof Boolean("false"));

console.log("9. typeof null ->", typeof null, "| Тип элемента:", typeof (typeof null));

console.log("10. typeof NaN ->", typeof NaN, "| Тип элемента:", typeof (typeof NaN));
