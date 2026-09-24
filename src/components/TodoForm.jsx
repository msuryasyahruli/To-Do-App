import { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const wasAdded = onAddTodo(title);

    if (!wasAdded) {
      setError('Enter a task title before adding it.');
      return;
    }

    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="task-title">
          Task title
        </label>
        <input
          id="task-title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) {
              setError('');
            }
          }}
          placeholder="Add a task, meeting note, or follow-up"
          className="min-h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500"
        />
        <button
          type="submit"
          className="min-h-12 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Add Task
        </button>
      </div>
      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
    </form>
  );
}
