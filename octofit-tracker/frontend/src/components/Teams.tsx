import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/fetchUtils'

type Team = {
  _id: string
  name: string
  members: string[]
  score: number
}

type TeamsProps = {
  apiBaseUrl: string
}

function Teams({ apiBaseUrl }: TeamsProps) {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTeams() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchJson<Team>(`${apiBaseUrl}/teams/`)
        setTeams(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [apiBaseUrl])

  return (
    <div>
      <h2>Teams</h2>
      <p className="text-muted">View team standings and member rosters.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading teams…</div>}

      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-12" key={team._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text mb-1">Score: {team.score}</p>
                  <p className="card-text">
                    Members: {team.members.length > 0 ? team.members.join(', ') : 'No members'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-secondary">No teams are available yet.</div>
      )}
    </div>
  )
}

export default Teams
