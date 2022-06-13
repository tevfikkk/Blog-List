import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters long']
    },
    body: {
      type: String,
      required: [true, 'Body is required']
    },
    date: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },

  {
    timestamps: true
  }
)

export default mongoose.model('Blog', blogSchema)
