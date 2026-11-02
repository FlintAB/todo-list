
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoList from './components/TodoList/TodoList';
import type { Todo, TodoFilterType } from './types/types';
import styles from './App.module.css';

const initialTodos: Todo[] = [
  { id: 1, title: 'Изучить основы React', completed: true },
  { id: 2, title: 'Попрактиковаться с TypeScript', completed: false },
  { id: 3, title: 'Создать приложение Todo List', completed: false },
  { id: 4, title: 'Разобраться с React Hooks', completed: true },
];

function getInitialTodos(): Todo[] {
  try {
    const savedTodos = localStorage.getItem('todos');

    if (!savedTodos) {
      return initialTodos;
    }

    const parsedTodos: unknown = JSON.parse(savedTodos);

    if (!Array.isArray(parsedTodos)) {
      return initialTodos;
    }

    const isValid = parsedTodos.every(
      (todo): todo is Todo =>
        typeof todo === 'object' &&
        todo !== null &&
        typeof todo.id === 'number' &&
        typeof todo.title === 'string' &&
        typeof todo.completed === 'boolean',
    );

    return isValid ? parsedTodos : initialTodos;
  } catch {
    return initialTodos;
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [activeFilter, setActiveFilter] = useState<TodoFilterType>('all');

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch {
      console.error('Не удалось сохранить задачи в localStorage');
    }
  }, [todos]);

  function handleAddTodo(title: string) {
    setTodos((currentTodos) => {
      const nextId =
        currentTodos.reduce(
          (maxId, todo) => Math.max(maxId, todo.id),
          0,
        ) + 1;

      const newTodo: Todo = {
        id: nextId,
        title,
        completed: false,
      };

      return [...currentTodos, newTodo];
    });
  }

  function handleToggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  }

  function handleDeleteTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id),
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'active') {
      return !todo.completed;
    }

    if (activeFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const completedCount = todos.filter(
    (todo) => todo.completed,
  ).length;

  const activeCount = todos.length - completedCount;

  return (
    <main className={styles.app}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1>Мои задачи</h1>
        </header>

        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <span className={styles.statsNumber}>
              {todos.length}
            </span>
            <span className={styles.statsLabel}>
              Всего задач
            </span>
          </div>

          <div className={styles.statsItem}>
            <span className={styles.statsNumber}>
              {activeCount}
            </span>
            <span className={styles.statsLabel}>
              Активные
            </span>
          </div>

          <div className={styles.statsItem}>
            <span className={styles.statsNumber}>
              {completedCount}
            </span>
            <span className={styles.statsLabel}>
              Выполненные
            </span>
          </div>
        </div>

        <TodoForm onAddTodo={handleAddTodo} />

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h2>Список задач</h2>

            <TodoFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <TodoList
            todos={filteredTodos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>

        <footer className={styles.footer}>
          <span>Осталось задач: {activeCount}</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
