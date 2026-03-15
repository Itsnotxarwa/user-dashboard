import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import History from './components/history';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

