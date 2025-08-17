import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold text-primary-600 dark:text-primary-400 text-lg tracking-tight">لعبة المعرفة</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" end className={({isActive}) => isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : 'hover:text-primary-600'}>الرئيسية</NavLink>
            <NavLink to="/select-categories" className={({isActive}) => isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : 'hover:text-primary-600'}>الفئات</NavLink>
            <NavLink to="/game" className={({isActive}) => isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : 'hover:text-primary-600'}>اللعبة</NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">{children}</main>
  <footer className="py-6 text-center text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700">© ٢٠٢٥ لعبة المعرفة</footer>
    </div>
  );
};
