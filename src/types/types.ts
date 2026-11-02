export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoFilterType = 'all' | 'active' | 'completed';