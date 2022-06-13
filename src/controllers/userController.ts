import bcrypt from 'bcrypt'
import { Request, Response, Router } from 'express'

import { User } from '../models/userModel'

export const userRouter: Router = Router()

// POST /api/users
// Create a new user
// Public route
userRouter.post('/', async (req: Request, res: Response) => {
  const {
    username,
    name,
    password
  }: {
    username: string
    name: string
    password: string
  } = req.body

  //! If the username is already taken, return a 409 error
  const existingUser = await User.findOne({ username: username })

  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' })
  }

  //! Salt is a random string of characters
  const salt = await bcrypt.genSalt(10)

  //! Hash the password
  const hashedPassword = await bcrypt.hash(password, salt)

  //! Create a new user
  const user = new User({
    username,
    name,
    password: hashedPassword //! The password is hashed
  })

  //! Save the user and respond with the user
  res.status(201).json(await user.save())
})

// GET /api/users
// Returns all users
// Public route
userRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).json(await User.find({}))
})
