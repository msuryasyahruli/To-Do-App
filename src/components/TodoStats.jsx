const statCards = [
  { key: 'total', label: 'Total', tone: 'border-slate-200 bg-white text-slate-950' },
  { key: 'active', label: 'Active', tone: 'border-blue-100 bg-blue-50 text-blue-700' },
  { key: 'completed', label: 'Completed', tone: 'border-emerald-100 bg-emerald-50 text-emerald-700' },
];

export default function TodoStats({ stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {statCards.map((stat) => (
        <section
          key={stat.key}
          className={`rounded-lg border p-4 shadow-sm ${stat.tone}`}
          aria-label={`${stat.label} tasks`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            {stat.label}
          </p>
          <p className="mt-2 text-3xl font-bold">{stats[stat.key]}</p>
        </section>
      ))}
    </div>
  );
}
