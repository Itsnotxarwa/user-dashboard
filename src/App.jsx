import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserDashboard from './components/UserDashboard';
import Settings from "./components/settings";
import CallsHistory from './components/callsHistory';
import SessionExpired from "./SessionExpired";

function App() {
  const [sessionValid, setSessionValid] = useState(true);

  useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setSessionValid(false);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setSessionValid(false);
            }
        } catch {
            setSessionValid(false);
        }
    }, []);

    if (!sessionValid) return <SessionExpired />;

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<CallsHistory />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

