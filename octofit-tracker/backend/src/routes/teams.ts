import { Router } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean()
  res.json({ teams, message: 'Fetch teams' })
})

export default router
