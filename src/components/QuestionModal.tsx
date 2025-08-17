import React, { useEffect, useRef, useState } from 'react';
import { Question } from '../game/data';
import { useGame } from '../game/GameContext';

interface Props {
  question: Question | null;
  onClose(): void;
}

export const QuestionModal: React.FC<Props> = ({ question, onClose }) => {
  const { teams, awardPoints, markQuestionUsed, nextTeam } = useGame();
  const [showAnswer, setShowAnswer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (question) {
      setShowAnswer(false);
      setSeconds(0);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [question]);

  if (!question) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  function handleAward(teamId?: string) {
    if (teamId) awardPoints(teamId, question.points);
    markQuestionUsed(question.id);
    nextTeam();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden animate-scaleIn">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            <span>{question.difficulty === 'easy' ? 'سهل' : question.difficulty === 'medium' ? 'متوسط' : 'صعب'}</span>
            <span className="font-mono">{mm}:{ss}</span>
            <span className="font-semibold text-primary-600">{question.points}</span>
          </div>
          <h2 className="text-lg font-semibold leading-snug">{question.question}</h2>
          {!showAnswer && (
            <button onClick={() => setShowAnswer(true)} className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-500 text-sm">عرض الإجابة</button>
          )}
          {showAnswer && (
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded text-primary-700 dark:text-primary-300">
                <p className="font-medium">الإجابة:</p>
                <p>{question.answer}</p>
              </div>
              <p className="text-sm font-medium">من أجاب بشكل صحيح؟</p>
              <div className="flex flex-wrap gap-2">
                {teams.map(t => (
                  <button key={t.id} onClick={() => handleAward(t.id)} className="px-3 py-1.5 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-sm">
                    {t.name}
                  </button>
                ))}
                <button onClick={() => handleAward(undefined)} className="px-3 py-1.5 rounded bg-red-500/90 text-white hover:bg-red-500 text-sm">لا أحد</button>
              </div>
            </div>
          )}
        </div>
  <button onClick={onClose} className="absolute top-2 left-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200" aria-label="إغلاق">✕</button>
      </div>
    </div>
  );
};
