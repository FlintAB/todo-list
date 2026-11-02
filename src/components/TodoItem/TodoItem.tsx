import type { Todo } from '../../types/types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
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
        onClick={() => onToggle(todo.id)}
      >
      </button>

      <span className={styles.title}>{todo.title}</span>

      <button
        className={styles.delete}
        type="button"
        aria-label="Удалить задачу"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
