import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Settings from "./components/settings";

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

