import mongoose from 'mongoose'

export interface LeaderboardEntryDocument extends mongoose.Document {
  team: mongoose.Types.ObjectId
  totalPoints: number
  rank: number
}

const leaderboardEntrySchema = new mongoose.Schema<LeaderboardEntryDocument>({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  totalPoints: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, default: 0 }
})

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema)
export default LeaderboardEntry
