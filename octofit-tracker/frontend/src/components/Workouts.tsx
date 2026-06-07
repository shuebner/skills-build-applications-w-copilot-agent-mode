import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from './api.ts'

type Workout = {
  name?: string
  focus?: string
  duration?: number
  intensity?: string
  description?: string
}

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'))
        const data = await response.json()
        setWorkouts(normalizeApiResponse(data))
      } catch (err) {
        setError('Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <p>Loading workouts…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((workout, index) => (
            <li key={`${workout.name ?? 'workout'}-${index}`}>
              <strong>{workout.name ?? 'Untitled workout'}</strong>
              <div>Focus: {workout.focus ?? 'n/a'}</div>
              <div>Duration: {workout.duration ?? 'n/a'} min</div>
              <div>Intensity: {workout.intensity ?? 'n/a'}</div>
              <div>{workout.description ?? 'No description available.'}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Workouts
