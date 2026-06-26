import { useMemo } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const BASE_API_URL = useMemo(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    return codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'
  }, [])

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          Modern multi-tier app with React 19, Express, MongoDB, and Vite.
        </p>
        <p className="small text-muted">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces routing; otherwise the app falls back to localhost.
        </p>
      </header>

      <nav className="mb-4">
        <div className="nav nav-tabs">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/users" element={<Users apiBaseUrl={BASE_API_URL} />} />
        <Route path="/teams" element={<Teams apiBaseUrl={BASE_API_URL} />} />
        <Route path="/activities" element={<Activities apiBaseUrl={BASE_API_URL} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={BASE_API_URL} />} />
        <Route path="/workouts" element={<Workouts apiBaseUrl={BASE_API_URL} />} />
        <Route path="*" element={<Users apiBaseUrl={BASE_API_URL} />} />
      </Routes>
    </div>
  )
}

export default App
