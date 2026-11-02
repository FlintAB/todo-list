
import type { TodoFilterType } from '../../types/types';
import styles from './TodoFilter.module.css';

function TodoFilter() {
  const filters: { label: string; value: TodoFilterType }[] = [
    { label: 'Все', value: 'all' },
    { label: 'Активные', value: 'active' },
    { label: 'Выполненные', value: 'completed' },
  ];

  return (
    <div className={styles.filter}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`${styles.button} ${
            filter.value === 'all' ? styles.active : ''
          }`}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
