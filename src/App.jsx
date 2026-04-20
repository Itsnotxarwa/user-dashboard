import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

