import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'
import { connectDatabase, mongoUri } from '../config/database.js'

const seed = async () => {
  console.log('Seed the octofit_db database with test data')

  await connectDatabase()
  console.log('Connected to MongoDB:', mongoUri)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ])

  const teams = await Team.create([
    {
      name: 'Deep Sea Sprinters',
      description: 'A competitive team that thrives on fast-paced interval training.',
      memberCount: 8
    },
    {
      name: 'Current Crushers',
      description: 'Endurance athletes who focus on consistency and positive splits.',
      memberCount: 5
    }
  ])

  const users = await User.create([
    {
      name: 'Avery Octo',
      email: 'avery@octofit.app',
      team: teams[0]._id,
      role: 'captain'
    },
    {
      name: 'Jordan Wave',
      email: 'jordan@octofit.app',
      team: teams[1]._id,
      role: 'athlete'
    },
    {
      name: 'Maya Current',
      email: 'maya@octofit.app',
      team: teams[1]._id,
      role: 'athlete'
    }
  ])

  const workouts = await Workout.create([
    {
      name: 'Power Surge',
      focus: 'strength',
      duration: 30,
      intensity: 'high',
      description: 'A short, explosive routine for strength and muscle endurance.'
    },
    {
      name: 'Endurance Flow',
      focus: 'cardio',
      duration: 45,
      intensity: 'medium',
      description: 'A steady session designed to build aerobic capacity.'
    }
  ])

  const activities = await Activity.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'run',
      duration: 42,
      calories: 380,
      distance: 8.2
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      type: 'cycle',
      duration: 55,
      calories: 520,
      distance: 22.5
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      type: 'swim',
      duration: 35,
      calories: 320,
      distance: 1.2
    }
  ])

  const leaderboard = await Leaderboard.create([
    {
      team: teams[0]._id,
      rank: 1,
      score: 1430
    },
    {
      team: teams[1]._id,
      rank: 2,
      score: 1320
    }
  ])

  console.log('Seed complete:')
  console.log(`  users: ${users.length}`)
  console.log(`  teams: ${teams.length}`)
  console.log(`  workouts: ${workouts.length}`)
  console.log(`  activities: ${activities.length}`)
  console.log(`  leaderboard entries: ${leaderboard.length}`)

  await mongoose.connection.close()
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
