import { useState } from 'react';

const formatCreatedAt = (createdAt) => {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(createdAt));
};

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [error, setError] = useState('');

  const handleSave = () => {
    const wasUpdated = onUpdate(todo.id, draftTitle);

    if (!wasUpdated) {
      setError('Task title cannot be empty.');
      return;
    }

    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setDraftTitle(todo.title);
    setIsEditing(false);
    setError('');
  };

  const handleDelete = () => {
    onDelete(todo);
  };

  return (
    <article
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md ${
        todo.completed ? 'opacity-70' : ''
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-start">
        <label className="flex h-6 w-6 cursor-pointer items-center justify-center sm:mt-1">
          <span className="sr-only">
            Mark {todo.title} as {todo.completed ? 'active' : 'completed'}
          </span>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-600 transition focus:ring-blue-500"
          />
        </label>

        <div className="min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <label className="sr-only" htmlFor={`edit-${todo.id}`}>
                Edit task
              </label>
              <input
                id={`edit-${todo.id}`}
                value={draftTitle}
                onChange={(event) => {
                  setDraftTitle(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSave();
                  }

                  if (event.key === 'Escape') {
                    handleCancel();
                  }
                }}
                className="min-h-11 w-full rounded-lg border border-blue-200 bg-blue-50/40 px-3 text-sm font-semibold text-slate-900 transition focus:border-blue-500"
                autoFocus
              />
              {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
            </div>
          ) : (
            <>
              <h3
                className={`break-words text-base font-semibold text-slate-950 ${
                  todo.completed ? 'line-through decoration-2' : ''
                }`}
              >
                {todo.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">Created {formatCreatedAt(todo.createdAt)}</p>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
