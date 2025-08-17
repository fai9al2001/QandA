import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../game/data';
import { useGame } from '../game/GameContext';

export default function CategorySelect() {
  const { selectedCategories, setSelectedCategories } = useGame();
  const navigate = useNavigate();
  const limit = 6;
  function toggle(id: string) {
    setSelectedCategories(selectedCategories.includes(id)
      ? selectedCategories.filter(c => c !== id)
      : selectedCategories.length < limit ? [...selectedCategories, id] : selectedCategories);
  }
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
    <h1 className="text-2xl font-semibold">اختر {limit} فئات</h1>
  <Link to="/" className="text-sm text-primary-600">رجوع</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map(cat => {
          const active = selectedCategories.includes(cat.id);
          const disabled = !active && selectedCategories.length >= limit;
          return (
            <button key={cat.id} onClick={() => toggle(cat.id)} disabled={disabled} className={`group relative p-4 rounded-xl border flex flex-col items-start gap-2 text-left transition ${active ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/40' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-primary-400'} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}>
              <span className="text-3xl drop-shadow-sm">{cat.emoji}</span>
              <span className="font-medium text-lg">{cat.name}</span>
      <span className="text-xs opacity-70">٦٠ سؤال</span>
              {active && <span className="absolute top-2 left-2 text-xs bg-white/20 rounded px-2 py-0.5">محدد</span>}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
  <p className="text-sm text-neutral-500 dark:text-neutral-400">{selectedCategories.length}/{limit} مختارة</p>
  <button disabled={selectedCategories.length !== limit} onClick={() => navigate('/setup')} className="px-5 py-2 rounded bg-primary-600 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-500">متابعة</button>
      </div>
    </div>
  );
}
