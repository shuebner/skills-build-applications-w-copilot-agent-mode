import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.tsx'
import Leaderboard from './components/Leaderboard.tsx'
import Teams from './components/Teams.tsx'
import Users from './components/Users.tsx'
import Workouts from './components/Workouts.tsx'





function App() {
  return (
    <main>
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          Presentation tier using React 19, Vite, and react-router-dom.
          <br />
          The frontend uses a local backend on <code>http://localhost:8000/api</code>.
        </p>
      </header>

      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          Users
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => (isActive ? 'active' : '')}>
          Teams
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => (isActive ? 'active' : '')}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>
          Leaderboard
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => (isActive ? 'active' : '')}>
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h2>Welcome</h2>
              <p>
                Browse OctoFit Tracker data using the navigation links above.
                This dev setup uses localhost ports for both frontend and backend.
              </p>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  )
}

export default App
