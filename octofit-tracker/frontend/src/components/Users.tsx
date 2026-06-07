import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from './api.ts'

type User = {
  name?: string
  email?: string
  role?: string
  team?: { name?: string }
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'))
        const data = await response.json()
        setUsers(normalizeApiResponse(data))
      } catch (err) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users…</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={`${user.email ?? index}-${index}`}>
              <strong>{user.name ?? 'Unnamed user'}</strong>
              <div>Email: {user.email ?? 'n/a'}</div>
              <div>Role: {user.role ?? 'n/a'}</div>
              <div>Team: {user.team?.name ?? 'unassigned'}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Users
