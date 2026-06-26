import connectToDatabase from '../config/database.js'
import Activity from '../models/activity.js'
import LeaderboardEntry from '../models/leaderboard.js'
import Team from '../models/team.js'
import User from '../models/user.js'
import Workout from '../models/workout.js'

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  await connectToDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Ariana West', email: 'ariana@octofit.com', role: 'captain' },
    { name: 'Nate Chen', email: 'nate@octofit.com', role: 'member' },
    { name: 'Maya Ortiz', email: 'maya@octofit.com', role: 'member' }
  ])

  const teams = await Team.create([
    { name: 'Pulse Pioneers', description: 'Team focused on cardio and team challenges.', members: [users[0]._id, users[1]._id] },
    { name: 'Flex Force', description: 'Strength-focused fitness team for leaders.', members: [users[2]._id] }
  ])

  await User.updateMany(
    { _id: { $in: [users[0]._id, users[1]._id] } },
    { team: teams[0]._id }
  )

  await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id })

  const workouts = await Workout.create([
    { title: 'Core Crusher', description: 'A powerful 30-minute core and abs routine.', durationMinutes: 30, intensity: 'high' },
    { title: 'Sunrise Stretch', description: 'Low-impact morning mobility flow.', durationMinutes: 20, intensity: 'low' },
    { title: 'Power Circuit', description: 'Medium intensity full-body circuit training.', durationMinutes: 45, intensity: 'medium' }
  ])

  await Activity.create([
    { type: 'Running', durationMinutes: 40, caloriesBurned: 380, user: users[0]._id, performedAt: new Date('2026-06-01T08:00:00Z') },
    { type: 'Yoga', durationMinutes: 50, caloriesBurned: 210, user: users[1]._id, performedAt: new Date('2026-06-03T07:30:00Z') },
    { type: 'Strength Training', durationMinutes: 55, caloriesBurned: 420, user: users[2]._id, performedAt: new Date('2026-06-02T18:20:00Z') }
  ])

  await LeaderboardEntry.create([
    { team: teams[0]._id, totalPoints: 1250, rank: 1 },
    { team: teams[1]._id, totalPoints: 980, rank: 2 }
  ])

  console.log('Seed the octofit_db database with test data')
  console.log('Seeded users:', users.length)
  console.log('Seeded teams:', teams.length)
  console.log('Seeded workouts:', workouts.length)
}

seedDatabase()
  .then(() => {
    console.log('Seed complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed', error)
    process.exit(1)
  })
