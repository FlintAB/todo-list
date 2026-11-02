import type { TodoFilterType } from '../../types/types';
import styles from './TodoFilter.module.css';

interface TodoFilterProps {
  activeFilter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
}

const filters: { label: string; value: TodoFilterType }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' },
];

function TodoFilter({
  activeFilter,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <div className={styles.filter}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`${styles.button} ${
            activeFilter === filter.value ? styles.active : ''
          }`}
          type="button"
          aria-pressed={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;