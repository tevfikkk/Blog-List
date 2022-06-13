import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    body: {
      type: String,
      required: [true, 'Body is required']
    },
    date: Date
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Blog', blogSchema)
