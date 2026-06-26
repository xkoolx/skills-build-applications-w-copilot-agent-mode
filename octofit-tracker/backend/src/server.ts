import connectToDatabase from './config/database.js'
import app from './index.js'

const PORT = Number(process.env.PORT || 8000)
const CODESPACE_NAME = process.env.CODESPACE_NAME
const apiBaseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

const startServer = async () => {
  try {
    await connectToDatabase()
    console.log('Connected to MongoDB for octofit_db')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server listening on ${apiBaseUrl}`)
  })
}

startServer()
