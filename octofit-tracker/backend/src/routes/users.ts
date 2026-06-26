import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ users: [], message: 'Fetch users' })
})

export default router
