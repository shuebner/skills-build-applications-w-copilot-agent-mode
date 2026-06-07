import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from './api.ts'

type Activity = {
  type?: string
  duration?: number
  calories?: number
  distance?: number
  user?: { name?: string }
  team?: { name?: string }
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'))
        const data = await response.json()
        setActivities(normalizeApiResponse(data))
      } catch (err) {
        setError('Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <p>Loading activities…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={`${activity.type ?? 'activity'}-${index}`}>
              <strong>{activity.type ?? 'Activity'}</strong>
              <div>Duration: {activity.duration ?? 'n/a'} min</div>
              <div>Calories: {activity.calories ?? 'n/a'}</div>
              <div>Distance: {activity.distance ?? 'n/a'} km</div>
              <div>User: {activity.user?.name ?? 'unknown'}</div>
              <div>Team: {activity.team?.name ?? 'unknown'}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Activities
