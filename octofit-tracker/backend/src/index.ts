import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB at', mongoUri)
    console.log(`Backend running on http://localhost:${port}`)
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
})
