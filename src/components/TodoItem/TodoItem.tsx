
import type { Todo } from '../../types/types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li
      className={`${styles.item} ${
        todo.completed ? styles.completed : ''
      }`}
    >
      <button
        className={styles.checkbox}
        type="button"
        aria-label={
          todo.completed
            ? 'Отметить как невыполненную'
            : 'Отметить как выполненную'
        }
        aria-pressed={todo.completed}
      >
      </button>

      <span className={styles.title}>{todo.title}</span>

      <button
        className={styles.delete}
        type="button"
        aria-label="Удалить задачу"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
