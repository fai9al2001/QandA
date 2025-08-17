import React, { createContext, useContext, useEffect, useState } from 'react';
import { buildBoard, GeneratedBoardCategory } from './data';

export interface Team { id: string; name: string; score: number; }

export interface GameState {
  gameName: string;
  teams: Team[];
  currentTeamIndex: number;
  board: GeneratedBoardCategory[];
  started: boolean;
  selectedCategories: string[];
  seed: number;
  usedQuestionIds: Set<string>;
}

interface GameContextValue extends GameState {
  setGameName(name: string): void;
  setTeams(teams: Team[]): void;
  setSelectedCategories(ids: string[]): void;
  startGame(): void;
  awardPoints(teamId: string, points: number): void;
  markQuestionUsed(id: string): void;
  nextTeam(): void;
  resetGame(): void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

const STORAGE_KEY = 'quiz_game_state_v1';

const initialState: GameState = {
  gameName: '',
  teams: [],
  currentTeamIndex: 0,
  board: [],
  started: false,
  selectedCategories: [],
  seed: Date.now(),
  usedQuestionIds: new Set()
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...parsed, usedQuestionIds: new Set(parsed.usedQuestionIds) } as GameState;
      }
    } catch { /* ignore */ }
    return initialState;
  });

  // persist
  useEffect(() => {
    const toSave = { ...state, usedQuestionIds: Array.from(state.usedQuestionIds) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  function setGameName(gameName: string) { setState(s => ({ ...s, gameName })); }
  function setTeams(teams: Team[]) { setState(s => ({ ...s, teams })); }
  function setSelectedCategories(ids: string[]) { setState(s => ({ ...s, selectedCategories: ids })); }
  function startGame() {
    setState(s => ({
      ...s,
      board: buildBoard(s.selectedCategories, s.seed),
      started: true,
      usedQuestionIds: new Set(),
      currentTeamIndex: 0
    }));
  }
  function awardPoints(teamId: string, points: number) {
    setState(s => ({
      ...s,
      teams: s.teams.map(t => t.id === teamId ? { ...t, score: t.score + points } : t)
    }));
  }
  function markQuestionUsed(id: string) {
    setState(s => {
      const used = new Set(s.usedQuestionIds);
      used.add(id);
      return { ...s, usedQuestionIds: used };
    });
  }
  function nextTeam() { setState(s => ({ ...s, currentTeamIndex: (s.currentTeamIndex + 1) % (s.teams.length || 1) })); }
  function resetGame() { setState(initialState); }

  const value: GameContextValue = {
    ...state,
    setGameName,
    setTeams,
    setSelectedCategories,
    startGame,
    awardPoints,
    markQuestionUsed,
    nextTeam,
    resetGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
