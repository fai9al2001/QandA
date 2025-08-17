import { Link } from 'react-router-dom';

interface QuestionSummary {
  id: string;
  title: string;
  votes: number;
  answers: number;
  tags: string[];
}

const sample: QuestionSummary[] = [
  { id: '1', title: 'How do I set up React with TypeScript?', votes: 5, answers: 2, tags: ['react', 'typescript'] },
  { id: '2', title: 'Tailwind vs traditional CSS performance?', votes: 3, answers: 1, tags: ['css', 'tailwind'] }
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Latest Questions</h1>
        <Link to="/ask" className="text-sm bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-500">Ask Question</Link>
      </div>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded overflow-hidden">
        {sample.map(q => (
          <li key={q.id} className="p-4 flex flex-col gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition">
            <div className="flex gap-4 text-xs text-neutral-500">
              <span>{q.votes} votes</span>
              <span>{q.answers} answers</span>
            </div>
            <Link to={`/q/${q.id}`} className="font-medium text-primary-600 dark:text-primary-400 hover:underline">{q.title}</Link>
            <div className="flex flex-wrap gap-2">
              {q.tags.map(t => <span key={t} className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">{t}</span>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
