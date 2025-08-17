import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import CategorySelect from './pages/CategorySelect';
import SetupGame from './pages/SetupGame';
import GameBoard from './pages/GameBoard';
import NotFound from './pages/NotFound';
import { GameProvider } from './game/GameContext';

export default function App() {
  return (
    <GameProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/select-categories" element={<CategorySelect />} />
          <Route path="/setup" element={<SetupGame />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </GameProvider>
  );
}
