import { useState, type SyntheticEvent } from 'react';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTodo(trimmedTitle);
    setTitle('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Что нужно сделать?"
        aria-label="Новая задача"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button className={styles.button} type="submit">
        <span aria-hidden="true">+</span>
        Добавить таску
      </button>
    </form>
  );
}

export default TodoForm;
