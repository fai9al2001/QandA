import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    const fakeId = Math.random().toString(36).slice(2, 8);
    // In a real app you'd persist
    navigate(`/q/${fakeId}`);
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Ask a Question</h1>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded px-3 py-2 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600" />
        <p className="text-xs text-neutral-500">Be specific and imagine you’re asking a question to another person.</p>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Body</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} required rows={6} className="w-full border rounded px-3 py-2 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Tags</label>
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="react typescript" className="w-full border rounded px-3 py-2 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600" />
      </div>
      <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-500">Post Question</button>
    </form>
  );
}
