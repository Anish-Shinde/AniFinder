import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GenrePage from './pages/GenrePage'
import AnimeDetails from './pages/AnimeDetails'
import WatchHistory from './pages/WatchHistory'
import Recommendations from './pages/Recommendations'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenrePage />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/watch-history" element={<WatchHistory />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
