import mongoose, { ConnectOptions } from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  return mongoose.connect(MONGO_URI, {
    dbName: 'octofit_db',
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
}

export { MONGO_URI, connectToDatabase }
export default connectToDatabase
