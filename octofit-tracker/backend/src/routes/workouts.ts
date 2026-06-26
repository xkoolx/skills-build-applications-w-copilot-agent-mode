import { Router } from 'express'
import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean()
  res.json({ workouts, message: 'Fetch workouts' })
})

export default router
