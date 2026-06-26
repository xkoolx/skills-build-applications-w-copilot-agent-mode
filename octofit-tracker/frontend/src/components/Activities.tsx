import { useEffect, useState } from 'react'
import { fetchJson } from '../utils/fetchUtils'

type Activity = {
  _id: string
  user: string
  type: string
  duration: string
  date: string
}

type ActivitiesProps = {
  apiBaseUrl: string
}

function Activities({ apiBaseUrl }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadActivities() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchJson<Activity>(`${apiBaseUrl}/activities`)
        setActivities(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [apiBaseUrl])

  return (
    <div>
      <h2>Activities</h2>
      <p className="text-muted">Track recent workouts, runs, and other activity entries.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading activities…</div>}

      {!loading && !error && (
        <div className="list-group">
          {activities.map((activity) => (
            <div className="list-group-item" key={activity._id}>
              <div className="d-flex justify-content-between">
                <h5 className="mb-1">{activity.type}</h5>
                <small>{new Date(activity.date).toLocaleDateString()}</small>
              </div>
              <p className="mb-1">{activity.user}</p>
              <small>Duration: {activity.duration}</small>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-secondary">No activity records are available yet.</div>
      )}
    </div>
  )
}

export default Activities
