import { useMemo, useState } from 'react';
import ConfirmationModal from './components/ConfirmationModal.jsx';
import TodoFilter from './components/TodoFilter.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoStats from './components/TodoStats.jsx';
import { useTodos } from './hooks/useTodos.js';

const filterTodos = (todos, filter, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesSearch =
      !normalizedSearch || todo.title.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });
};

export default function App() {
  const {
    todos,
    stats,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter, searchTerm),
    [todos, filter, searchTerm],
  );

  const closeConfirmation = () => {
    setConfirmation(null);
  };

  const handleClearCompleted = () => {
    if (stats.completed === 0) {
      return;
    }

    setConfirmation({
      type: 'clear-completed',
      title: 'Clear completed tasks?',
      message: `This will remove ${stats.completed} completed task${
        stats.completed === 1 ? '' : 's'
      } from your dashboard. Active tasks will stay in place.`,
      confirmLabel: 'Clear Completed',
    });
  };

  const handleRequestDelete = (todo) => {
    setConfirmation({
      type: 'delete-task',
      todo,
      title: 'Delete this task?',
      message: `"${todo.title}" will be permanently removed from your task list.`,
      confirmLabel: 'Delete Task',
    });
  };

  const handleConfirm = () => {
    if (!confirmation) {
      return;
    }

    if (confirmation.type === 'clear-completed') {
      clearCompleted();
    }

    if (confirmation.type === 'delete-task' && confirmation.todo) {
      deleteTodo(confirmation.todo.id);
    }

    closeConfirmation();
  };

  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_46%,#f1f5f9_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <header className="grid gap-5 rounded-lg border border-white/70 bg-white/88 p-5 shadow-soft backdrop-blur sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                TaskFlow
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                To-Do Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Plan, search, filter, and finish work from one focused workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearCompleted}
              disabled={stats.completed === 0}
              className="min-h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700"
            >
              Clear Completed
            </button>
          </header>

          <TodoStats stats={stats} />

          <section className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-6">
            <TodoForm onAddTodo={addTodo} />
          </section>

          <section className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-950">Tasks</h2>
              <p className="mt-1 text-sm text-slate-500">
                Showing {visibleTodos.length} of {todos.length} task
                {todos.length === 1 ? '' : 's'}.
              </p>
            </div>

            <div className="mb-5">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <TodoList
              todos={visibleTodos}
              hasTodos={todos.length > 0}
              searchTerm={searchTerm}
              filter={filter}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={handleRequestDelete}
            />
          </section>
        </div>
      </main>

      <ConfirmationModal
        isOpen={Boolean(confirmation)}
        title={confirmation?.title}
        message={confirmation?.message}
        confirmLabel={confirmation?.confirmLabel}
        onConfirm={handleConfirm}
        onCancel={closeConfirmation}
      />
    </>
  );
}
