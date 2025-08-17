import { Link } from 'react-router-dom';
import { useGame } from '../game/GameContext';

export default function Landing() {
  const { resetGame } = useGame();
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-8 animate-fadeIn">
      <div className="space-y-4 max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-blue-400 text-transparent bg-clip-text">تحدي المعرفة</h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">أنشئ لعبة خاصة، اختر ٦ فئات، وتنافس في أسئلة سهلة ومتوسطة وصعبة. النقاط تنتظر الأسرع!</p>
      </div>
      <div className="flex gap-4">
        <Link to="/select-categories" className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium shadow-lg shadow-primary-600/30 transition-transform hover:-translate-y-0.5">إنشاء لعبة</Link>
        <button onClick={resetGame} className="px-6 py-3 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-medium">إعادة ضبط</button>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-6 opacity-70 text-4xl select-none">
        <span>🧪</span><span>📜</span><span>🏅</span>
        <span>🎵</span><span>💻</span><span>🚀</span>
        <span>🌿</span><span>🎬</span><span>➗</span>
      </div>
    </div>
  );
}
