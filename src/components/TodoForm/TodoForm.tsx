import styles from './TodoForm.module.css';

function TodoForm() {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Что нужно сделать?"
        aria-label="Новая задача"
      />

      <button className={styles.button} type="button">
        <span aria-hidden="true">+</span>
        Добавить таску
      </button>
    </form>
  );
}

export default TodoForm;