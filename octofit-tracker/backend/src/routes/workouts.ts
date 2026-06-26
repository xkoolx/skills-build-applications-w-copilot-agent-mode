import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ workouts: [], message: 'Fetch workouts' })
})

export default router
