import { useNavigate, Link } from 'react-router-dom';
import { useGame, Team } from '../game/GameContext';
import { useState } from 'react';

export default function SetupGame() {
  const { selectedCategories, setTeams, setGameName, gameName, startGame } = useGame();
  const navigate = useNavigate();
  const [teamInputs, setTeamInputs] = useState<string[]>(['فريق 1', 'فريق 2']);

  function addTeam() { if (teamInputs.length < 6) setTeamInputs(t => [...t, `فريق ${t.length + 1}`]); }
  function removeTeam(i: number) { if (teamInputs.length > 2) setTeamInputs(t => t.filter((_, idx) => idx !== i)); }
  function updateTeam(i: number, val: string) { setTeamInputs(t => t.map((v, idx) => idx === i ? val : v)); }

  function launch() {
  const teams: Team[] = teamInputs.map((name, i) => ({ id: `t${i}`, name: name.trim() || `فريق ${i+1}`, score: 0 }));
    setTeams(teams);
    startGame();
    navigate('/game');
  }

  if (selectedCategories.length !== 6) {
    return (
      <div className="space-y-6">
  <p className="text-sm text-red-600">يرجى اختيار ٦ فئات أولاً.</p>
  <Link to="/select-categories" className="text-primary-600">الانتقال لاختيار الفئات</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
  <h1 className="text-2xl font-semibold">إعداد اللعبة</h1>
  <Link to="/select-categories" className="text-sm text-primary-600">رجوع</Link>
      </div>
      <div className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">اسم اللعبة</label>
          <input value={gameName} onChange={e => setGameName(e.target.value)} placeholder="تحدي الجمعة" className="w-full rounded border px-3 py-2 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">الفرق</label>
            <button onClick={addTeam} disabled={teamInputs.length >= 6} className="text-xs px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 disabled:opacity-40">إضافة فريق</button>
          </div>
          <div className="space-y-2">
            {teamInputs.map((t, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={t} onChange={e => updateTeam(i, e.target.value)} className="flex-1 rounded border px-3 py-2 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700" />
                {teamInputs.length > 2 && <button onClick={() => removeTeam(i)} className="text-xs px-2 py-1 rounded bg-red-500/90 text-white">حذف</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
  <button onClick={launch} className="px-6 py-3 rounded bg-primary-600 text-white font-medium hover:bg-primary-500">بدء اللعبة</button>
    </div>
  );
}
