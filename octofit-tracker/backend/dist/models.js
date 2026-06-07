import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() }
});
const TeamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    memberCount: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() }
});
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: { type: Number, required: true },
    occurredAt: { type: Date, default: () => new Date() }
});
const LeaderboardSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() }
});
const WorkoutSchema = new Schema({
    name: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, required: true },
    intensity: { type: String, required: true },
    description: { type: String, required: true }
});
export const User = model('User', UserSchema);
export const Team = model('Team', TeamSchema);
export const Activity = model('Activity', ActivitySchema);
export const Leaderboard = model('Leaderboard', LeaderboardSchema);
export const Workout = model('Workout', WorkoutSchema);
