import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from './api.ts'

type LeaderboardEntry = {
  rank?: number
  score?: number
  team?: { name?: string }
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'))
        const data = await response.json()
        setEntries(normalizeApiResponse(data))
      } catch (err) {
        setError('Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <p>Loading leaderboard…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <ol>
          {entries.map((entry, index) => (
            <li key={`${entry.rank ?? index}-${index}`}>
              <strong>{entry.team?.name ?? 'Unknown team'}</strong>
              <div>Rank: {entry.rank ?? 'n/a'}</div>
              <div>Score: {entry.score ?? 'n/a'}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard
