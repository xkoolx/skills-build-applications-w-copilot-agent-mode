import { Router } from 'express'
import LeaderboardEntry from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('team').lean()
  res.json({ leaderboard, message: 'Fetch leaderboard' })
})

export default router
