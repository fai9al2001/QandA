import { Link, useParams } from 'react-router-dom';

interface Answer {
  id: string;
  body: string;
  votes: number;
}

const sampleAnswers: Answer[] = [
  { id: 'a1', body: 'Install dependencies, create tsconfig, configure bundler.', votes: 2 },
  { id: 'a2', body: 'Use Vite for fastest DX and Tailwind for utility classes.', votes: 1 }
];

export default function Question() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Question #{id}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">This is a placeholder question detail.</p>
      </div>
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Answers</h2>
        <ul className="space-y-4">
          {sampleAnswers.map(a => (
            <li key={a.id} className="p-4 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <div className="text-sm whitespace-pre-wrap">{a.body}</div>
              <div className="text-xs text-neutral-500 mt-2">{a.votes} votes</div>
            </li>
          ))}
        </ul>
      </section>
      <div>
        <Link to="/ask" className="text-sm bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-500">Add your answer</Link>
      </div>
    </div>
  );
}
