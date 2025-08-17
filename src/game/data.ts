// Game data generation utilities and static category definitions
export interface CategoryDef {
  id: string;
  name: string;
  emoji: string; // simple visual
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  categoryId: string;
  difficulty: Difficulty;
  points: number;
  question: string;
  answer: string;
  slot: number; // 0 or 1 within its difficulty grouping for the board
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'science', name: 'العلوم', emoji: '🧪' },
  { id: 'history', name: 'التاريخ', emoji: '📜' },
  { id: 'sports', name: 'الرياضة', emoji: '🏅' },
  { id: 'music', name: 'الموسيقى', emoji: '🎵' },
  { id: 'coding', name: 'البرمجة', emoji: '💻' },
  { id: 'space', name: 'الفضاء', emoji: '🚀' },
  { id: 'nature', name: 'الطبيعة', emoji: '🌿' },
  { id: 'movies', name: 'الأفلام', emoji: '🎬' },
  { id: 'math', name: 'الرياضيات', emoji: '➗' },
  { id: 'food', name: 'الطعام', emoji: '🍲' }
];

// Generate 60 questions per category (20 each difficulty) simplistic placeholders
export function generateCategoryQuestions(category: CategoryDef): Question[] {
  const questions: Question[] = [];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const pointsMap: Record<Difficulty, number> = { easy: 200, medium: 400, hard: 600 };
  difficulties.forEach(diff => {
    for (let i = 0; i < 20; i++) {
      questions.push({
        id: `${category.id}-${diff}-${i}`,
        categoryId: category.id,
        difficulty: diff,
        points: pointsMap[diff],
  question: `سؤال ${category.name} (${diff}) رقم ${i + 1}?`,
  answer: `الإجابة ${category.name} (${diff}) رقم ${i + 1}.`,
        slot: 0
      });
    }
  });
  return questions;
}

export interface GeneratedBoardCategory {
  category: CategoryDef;
  // exactly 2 per difficulty selected randomly
  easy: Question[]; // points 200
  medium: Question[]; // points 400
  hard: Question[]; // points 600
}

export function buildBoard(selectedCategoryIds: string[], seed = Date.now()): GeneratedBoardCategory[] {
  const rng = mulberry32(seed);
  return selectedCategoryIds.map(id => {
    const cat = CATEGORIES.find(c => c.id === id)!;
    const all = generateCategoryQuestions(cat);
    const pick = (diff: Difficulty, count: number) => shuffle(all.filter(q => q.difficulty === diff), rng).slice(0, count).map((q, idx) => ({ ...q, slot: idx }));
    return {
      category: cat,
      easy: pick('easy', 2),
      medium: pick('medium', 2),
      hard: pick('hard', 2)
    };
  });
}

// Simple deterministic PRNG
function mulberry32(a: number) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
