import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/fetchUtils'

type Workout = {
  _id: string
  name: string
  difficulty: string
  duration: string
}

type WorkoutsProps = {
  apiBaseUrl: string
}

function Workouts({ apiBaseUrl }: WorkoutsProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorkouts() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchJson<Workout>(`${apiBaseUrl}/workouts`)
        setWorkouts(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [apiBaseUrl])

  return (
    <div>
      <h2>Workouts</h2>
      <p className="text-muted">Browse workout plans and difficulty levels.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading workouts…</div>}

      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12" key={workout._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text mb-1">Difficulty: {workout.difficulty}</p>
                  <p className="card-text">Duration: {workout.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-secondary">No workouts are available yet.</div>
      )}
    </div>
  )
}

export default Workouts
