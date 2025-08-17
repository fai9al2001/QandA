import { useGame } from '../game/GameContext';
import { useEffect, useState } from 'react';
import { QuestionModal } from '../components/QuestionModal';
import { TeamScoreboard } from '../components/TeamScoreboard';
import { useNavigate } from 'react-router-dom';

export default function GameBoard() {
  const { board, started, teams, currentTeamIndex, usedQuestionIds, gameName, resetGame } = useGame();
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!started) navigate('/');
  }, [started, navigate]);

  const allQuestions = board.flatMap(b => [...b.easy, ...b.medium, ...b.hard]);
  const activeQuestion = allQuestions.find(q => q.id === activeQuestionId) || null;

  const rows = [
    { label: '200', diff: 'easy' as const, slot: 0 },
    { label: '200', diff: 'easy' as const, slot: 1 },
    { label: '400', diff: 'medium' as const, slot: 0 },
    { label: '400', diff: 'medium' as const, slot: 1 },
    { label: '600', diff: 'hard' as const, slot: 0 },
    { label: '600', diff: 'hard' as const, slot: 1 }
  ];

  function openQuestion(categoryId: string, diff: 'easy'|'medium'|'hard', slot: number) {
    const q = allQuestions.find(q => q.categoryId === categoryId && q.difficulty === diff && q.slot === slot);
    if (!q) return;
    if (usedQuestionIds.has(q.id)) return;
    setActiveQuestionId(q.id);
  }

  const totalTiles = board.length * 6;
  const usedCount = usedQuestionIds.size;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold flex items-center gap-3">{gameName || 'لعبة معلومات'} <span className="text-xs font-normal px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700">الدور: {teams[currentTeamIndex]?.name}</span></h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{usedCount}/{totalTiles} سؤال منتهٍ</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/')} className="text-sm px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-700">الرئيسية</button>
          <button onClick={resetGame} className="text-sm px-3 py-2 rounded bg-red-500/90 text-white">إعادة ضبط</button>
        </div>
      </div>
      <TeamScoreboard />
      <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${board.length}, minmax(140px,1fr))` }}>
          {board.map(col => (
            <div key={col.category.id} className="flex flex-col border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden m-1 bg-neutral-100/60 dark:bg-neutral-800/40 backdrop-blur">
              <div className="p-2 text-center text-xs font-semibold bg-gradient-to-br from-primary-600 to-blue-500 text-white h-16 flex flex-col items-center justify-center">
                <span className="text-2xl leading-none">{col.category.emoji}</span>
                <span className="truncate w-full">{col.category.name}</span>
              </div>
              {rows.map((r, idx) => {
                const q = (col as any)[r.diff].find((q: any) => q.slot === r.slot);
                const used = q && usedQuestionIds.has(q.id);
                return (
                  <button key={idx} disabled={!q || used} onClick={() => openQuestion(col.category.id, r.diff, r.slot)} className={`relative h-20 flex items-center justify-center font-bold text-xl transition border-t border-neutral-300 dark:border-neutral-700 ${used ? 'bg-neutral-300/40 dark:bg-neutral-700/40 line-through text-neutral-400 dark:text-neutral-500 cursor-not-allowed' : 'bg-white/80 dark:bg-neutral-900/60 hover:bg-primary-600 hover:text-white'} ${!used && idx % 2 === 0 ? 'animate-tilt' : ''}`}>
                    {r.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <QuestionModal question={activeQuestion} onClose={() => setActiveQuestionId(null)} />
    </div>
  );
}
