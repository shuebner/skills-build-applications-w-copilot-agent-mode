import mongoose, { Document, Schema, model } from 'mongoose'

interface UserDocument extends Document {
  name: string
  email: string
  team: mongoose.Types.ObjectId
  role: string
  createdAt: Date
}

interface TeamDocument extends Document {
  name: string
  description: string
  memberCount: number
  createdAt: Date
}

interface ActivityDocument extends Document {
  user: mongoose.Types.ObjectId
  team: mongoose.Types.ObjectId
  type: string
  duration: number
  calories: number
  distance: number
  occurredAt: Date
}

interface LeaderboardDocument extends Document {
  team: mongoose.Types.ObjectId
  rank: number
  score: number
  updatedAt: Date
}

interface WorkoutDocument extends Document {
  name: string
  focus: string
  duration: number
  intensity: string
  description: string
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
})

const TeamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  memberCount: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() }
})

const ActivitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  distance: { type: Number, required: true },
  occurredAt: { type: Date, default: () => new Date() }
})

const LeaderboardSchema = new Schema<LeaderboardDocument>({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
})

const WorkoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  duration: { type: Number, required: true },
  intensity: { type: String, required: true },
  description: { type: String, required: true }
})

export const User = model<UserDocument>('User', UserSchema)
export const Team = model<TeamDocument>('Team', TeamSchema)
export const Activity = model<ActivityDocument>('Activity', ActivitySchema)
export const Leaderboard = model<LeaderboardDocument>('Leaderboard', LeaderboardSchema)
export const Workout = model<WorkoutDocument>('Workout', WorkoutSchema)
