import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  role: string
  team?: mongoose.Types.ObjectId
  joinedAt: Date
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, default: () => new Date() }
})

const User = mongoose.model<UserDocument>('User', userSchema)
export default User
