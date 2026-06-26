import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/fetchUtils'

type User = {
  _id: string
  name: string
  email: string
  role: string
}

type UsersProps = {
  apiBaseUrl: string
}

function Users({ apiBaseUrl }: UsersProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchJson<User>(`${apiBaseUrl}/users/`)
        setUsers(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [apiBaseUrl])

  return (
    <div>
      <h2>Users</h2>
      <p className="text-muted">Browse OctoFit Tracker users and account roles.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading users…</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-secondary">No users found yet.</div>
      )}
    </div>
  )
}

export default Users
