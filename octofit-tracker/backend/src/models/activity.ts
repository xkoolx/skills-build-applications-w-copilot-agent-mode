import mongoose from 'mongoose'

export interface ActivityDocument extends mongoose.Document {
  type: string
  durationMinutes: number
  caloriesBurned: number
  user: mongoose.Types.ObjectId
  performedAt: Date
}

const activitySchema = new mongoose.Schema<ActivityDocument>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  performedAt: { type: Date, default: () => new Date() }
})

const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema)
export default Activity
