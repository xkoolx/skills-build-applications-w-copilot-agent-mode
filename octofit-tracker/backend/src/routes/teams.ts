import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ teams: [], message: 'Fetch teams' })
})

export default router
