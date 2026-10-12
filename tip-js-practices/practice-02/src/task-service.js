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