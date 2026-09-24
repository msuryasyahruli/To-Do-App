const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilter({ filter, onFilterChange, searchTerm, onSearchChange }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <label className="sr-only" htmlFor="search-tasks">
          Search tasks
        </label>
        <input
          id="search-tasks"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks by title"
          className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500"
        />
      </div>

      <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
        {filters.map((item) => {
          const isSelected = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`min-h-9 rounded-md px-3 text-sm font-semibold transition sm:px-4 ${
                isSelected
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:bg-white/70 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
