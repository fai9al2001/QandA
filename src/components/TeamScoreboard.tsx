import React from 'react';
import { useGame } from '../game/GameContext';

export const TeamScoreboard: React.FC = () => {
  const { teams, currentTeamIndex } = useGame();
  return (
    <div className="flex gap-3 flex-wrap">
      {teams.map((t, i) => (
        <div key={t.id} className={`px-3 py-2 rounded border text-sm font-medium shadow-sm ${i === currentTeamIndex ? 'bg-primary-600 text-white border-primary-600 animate-pulse' : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'}`}>
          {t.name}: <span className="font-mono">{t.score}</span>
        </div>
      ))}
    </div>
  );
};
