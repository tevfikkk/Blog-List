import bcrypt from 'bcrypt'
import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models/userModel'

export const loginRouter: Router = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
  const {
    username,
    password
  }: {
    username: string
    password: string
  } = req.body

  //! Search for user in database
  const user = await User.findOne({ username })

  //! Check if password is correct
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  //! If password is correct, create a token
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username as string,
    id: user._id as string
  }

  //! Create a token
  const token = jwt.sign(userForToken, process.env.SECRET as string)

  res.status(200).json({
    token,
    username: user.username,
    name: user.name
  })
})
