import express from 'express'
import { connectDatabase, mongoUri } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().populate('team').lean()
  res.json({ users })
})

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().lean()
  res.json({ teams })
})

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user team').lean()
  res.json({ activities })
})

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('team').sort('rank').lean()
  res.json({ leaderboard })
})

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean()
  res.json({ workouts })
})

const startServer = async () => {
  try {
    await connectDatabase()
    console.log('Connected to MongoDB at', mongoUri)
    console.log(`Backend running on ${apiUrl}`)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}

startServer()
