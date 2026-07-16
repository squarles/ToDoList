import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setTodos(JSON.parse(raw));
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, isLoaded]);

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: Date.now().toString(), title: trimmed, done: false }]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return { todos, isLoaded, addTodo, toggleTodo, removeTodo };
}
