import express from 'express'
import connectToDatabase from './database.js'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const app = express()
const PORT = Number(process.env.PORT || 8000)

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running.' })
})

const startServer = async () => {
  try {
    await connectToDatabase()
    console.log('Connected to MongoDB for octofit_db')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

startServer()
