export const STORAGE_VERSION = 1;

function isValidTask(task) {
  return (
    task &&
    Number.isSafeInteger(task.id) &&
    task.id > 0 &&
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    task.title.length <= 100 &&
    typeof task.completed === "boolean" &&
    ["low", "medium", "high"].includes(task.priority)
  );
}

export function isValidTaskList(value) {
  if (!Array.isArray(value)) return false;
  const ids = new Set();
  for (const task of value) {
    if (!isValidTask(task)) return false;
    if (ids.has(task.id)) return false;
    ids.add(task.id);
  }
  return true;
}

function cloneTasks(tasks) {
  return tasks.map((task) => ({ ...task }));
}

export function loadTasks(storage, key, fallbackTasks) {
  const fallbackCopy = cloneTasks(fallbackTasks);
  try {
    const raw = storage.getItem(key);
    if (raw === null) {
      return { ok: true, source: "initial", tasks: fallbackCopy };
    }
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) {
      return { ok: false, source: "fallback", tasks: fallbackCopy, error: "Неизвестная версия данных" };
    }
    if (!isValidTaskList(parsed.tasks)) {
      return { ok: false, source: "fallback", tasks: fallbackCopy, error: "Некорректная схема данных" };
    }
    return { ok: true, source: "storage", tasks: cloneTasks(parsed.tasks) };
  } catch (error) {
    return { ok: false, source: "fallback", tasks: fallbackCopy, error: `Ошибка чтения: ${error.message}` };
  }
}

export function saveTasks(storage, key, tasks) {
  if (!isValidTaskList(tasks)) {
    return { ok: false, error: "Некорректные данные для сохранения" };
  }
  try {
    const value = { version: STORAGE_VERSION, tasks: cloneTasks(tasks) };
    storage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Ошибка записи: ${error.message}` };
  }
}

export function removeSavedTasks(storage, key) {
  try {
    storage.removeItem(key);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Ошибка удаления: ${error.message}` };
  }
}