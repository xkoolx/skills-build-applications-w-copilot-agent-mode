import mongoose from 'mongoose'

export interface WorkoutDocument extends mongoose.Document {
  title: string
  description: string
  durationMinutes: number
  intensity: string
  createdAt: Date
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  createdAt: { type: Date, default: () => new Date() }
})

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema)
export default Workout
