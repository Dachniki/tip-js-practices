const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);

function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;
}

function normalizeTitle(title) {
  if (typeof title !== "string") return null;
  const trimmed = title.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return null;
  return trimmed;
}

export function validateTaskDraft(draft, tasks, editingId = null) {
  const errors = {};
  let id;
  let title;
  let priority;

  if (editingId !== null) {
    if (!isValidId(editingId) || !tasks.some((t) => t.id === editingId)) {
      errors.id = "Редактируемая задача не найдена";
    } else {
      id = editingId;
    }
  } else {
    const rawId = draft.id;
    const numId = Number(rawId);
    if (rawId === "" || rawId === null || rawId === undefined || !isValidId(numId)) {
      errors.id = "Введите положительное целое число";
    } else if (tasks.some((t) => t.id === numId)) {
      errors.id = "Задача с таким id уже существует";
    } else {
      id = numId;
    }
  }

  title = normalizeTitle(draft.title);
  if (!title) {
    errors.title = "Название должно быть от 1 до 100 символов";
  }

  if (!ALLOWED_PRIORITIES.has(draft.priority)) {
    errors.priority = "Выберите допустимый приоритет";
  } else {
    priority = draft.priority;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, value: { id, title, priority } };
}