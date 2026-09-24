import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'taskflow.todos';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const isValidTodo = (todo) => {
  return (
    todo &&
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'string'
  );
};

const loadStoredTodos = () => {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);

    if (!storedTodos) {
      return [];
    }

    const parsedTodos = JSON.parse(storedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos.filter(isValidTodo) : [];
  } catch {
    return [];
  }
};

export function useTodos() {
  const [todos, setTodos] = useState(loadStoredTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    const total = todos.length;

    return {
      total,
      completed,
      active: total - completed,
    };
  }, [todos]);

  const addTodo = (title) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return false;
    }

    const todo = {
      id: createId(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((currentTodos) => [todo, ...currentTodos]);
    return true;
  };

  const updateTodo = (id, title) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return false;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );

    return true;
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  };

  return {
    todos,
    stats,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
