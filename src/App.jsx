import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Settings from "./components/settings";
import CallsHistory from './components/callsHistory';
import SessionExpired from "./SessionExpired";
import Agents from "./components/Agents";
import Campaigns from './components/Campaigns';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<CallsHistory />} />
        <Route path="/bot" element={<Agents />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="session-expired" element={<SessionExpired />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

