import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundpage/NotFoundPage';
// 홈페이지, 네비바, 배너, 영화목록, 영화카드&디테일

function App() {
  return (
    <Routes>

      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />

    </Routes>
  );
}

export default App;
