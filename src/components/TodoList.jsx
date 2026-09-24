import TodoItem from './TodoItem.jsx';

export default function TodoList({
  todos,
  hasTodos,
  searchTerm,
  filter,
  onToggle,
  onUpdate,
  onDelete,
}) {
  if (!hasTodos) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-bold text-slate-950">Your task board is clear.</p>
        <p className="mt-2 text-sm text-slate-500">
          Add your first task above to start building today&apos;s plan.
        </p>
      </section>
    );
  }

  if (todos.length === 0) {
    const filterLabel = filter === 'all' ? 'tasks' : `${filter} tasks`;
    const searchCopy = searchTerm ? ` matching "${searchTerm}"` : '';

    return (
      <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-bold text-slate-950">No matching tasks found.</p>
        <p className="mt-2 text-sm text-slate-500">
          Try a different search or switch filters to see more {filterLabel}
          {searchCopy}.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
