import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Settings from "./components/settings";
import CallsHistory from './components/callsHistory';
import SessionExpired from "./SessionExpired";
import Agents from "./components/Agents";
import Campaigns from './components/Campaigns';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><CallsHistory /></ProtectedRoute>} />
        <Route path="/bot" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

