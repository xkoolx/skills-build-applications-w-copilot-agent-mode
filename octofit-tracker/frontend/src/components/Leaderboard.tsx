import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/fetchUtils'

type LeaderboardEntry = {
  _id: string
  user: string
  score: number
  rank: number
}

type LeaderboardProps = {
  apiBaseUrl: string
}

function Leaderboard({ apiBaseUrl }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchJson<LeaderboardEntry>(`${apiBaseUrl}/leaderboard/`)
        setLeaderboard(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [apiBaseUrl])

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="text-muted">See the top performers in the OctoFit community.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading leaderboard…</div>}

      {!loading && !error && (
        <ol className="list-group list-group-numbered">
          {leaderboard.map((entry) => (
            <li className="list-group-item d-flex justify-content-between align-items-start" key={entry._id}>
              <div>
                <div className="fw-bold">{entry.user}</div>
                <div className="text-muted">Rank {entry.rank}</div>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </li>
          ))}
        </ol>
      )}

      {!loading && !error && leaderboard.length === 0 && (
        <div className="alert alert-secondary">Leaderboard data is not available yet.</div>
      )}
    </div>
  )
}

export default Leaderboard
