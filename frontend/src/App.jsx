import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrangChu from './pages/TrangChu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrangChu />} />
      </Routes>
    </Router>
  );
}

export default App;
