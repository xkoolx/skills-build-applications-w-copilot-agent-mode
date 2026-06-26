import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ leaderboard: [], message: 'Fetch leaderboard' })
})

export default router
