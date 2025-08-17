import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark(d => !d)}
      className="rounded px-2 py-1 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-xs"
      aria-label="Toggle dark mode"
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  );
};
