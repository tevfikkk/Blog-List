import { NextFunction, Request, Response, Router } from 'express'

import Blog from '../models/blogModel'
import type { blogType } from '../types/blog'

export const blogRouter: Router = Router()

blogRouter.get('/', async (req: Request, res: Response) => {
  Blog.find({}).then((blogs: blogType[]) => {
    res.status(200).json({ data: blogs })
  })
})
