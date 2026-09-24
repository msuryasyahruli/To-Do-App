import { useEffect } from 'react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close confirmation dialog"
        className="absolute inset-0 cursor-default bg-slate-950/55 backdrop-blur-sm"
        onClick={onCancel}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-message"
        className="relative w-full max-w-md rounded-lg border border-white/70 bg-white p-5 shadow-soft sm:p-6"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-50 text-2xl font-bold text-rose-600">
          !
        </div>

        <h2 id="confirmation-title" className="mt-4 text-xl font-bold text-slate-950">
          {title}
        </h2>
        <p id="confirmation-message" className="mt-2 text-sm leading-6 text-slate-600">
          {message}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 rounded-lg bg-rose-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 active:scale-[0.99]"
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
