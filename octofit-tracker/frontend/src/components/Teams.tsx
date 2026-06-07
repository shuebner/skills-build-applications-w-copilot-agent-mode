import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from './api.ts'

type Team = {
  name?: string
  description?: string
  memberCount?: number
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'))
        const data = await response.json()
        setTeams(normalizeApiResponse(data))
      } catch (err) {
        setError('Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <p>Loading teams…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {teams.map((team, index) => (
            <li key={`${team.name ?? index}-${index}`}>
              <strong>{team.name ?? 'Unnamed team'}</strong>
              <div>{team.description ?? 'No description'}</div>
              <div>Members: {team.memberCount ?? 0}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Teams
