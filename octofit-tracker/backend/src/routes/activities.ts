import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ activities: [], message: 'Fetch activities' })
})

export default router
