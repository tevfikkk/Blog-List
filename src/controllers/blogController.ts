import { NextFunction, Request, Response, Router } from 'express'

import Blog from '../models/blogModel'
import { User } from '../models/userModel'
import type { blogType } from '../types/blog'

export const blogRouter: Router = Router()

// GET /api/blogs
// Returns all blogs
// Public route
blogRouter.get('/', async (req: Request, res: Response) => {
  Blog.find({}).then((blogs: blogType[]) => {
    res.status(200).json({ data: blogs })
  })
})

// GET /api/blogs/:id
// Returns a blog by id
// Public route
blogRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    Blog.findById(req.params.id)
      .then((blogs: blogType[]) => {
        blogs
          ? res.status(200).json(blogs)
          : res.status(404).json({ message: 'Blog not found' })
      })
      .catch((err: Error) => next(err))
  }
)

// POST /api/blogs
// Creates a new blog
// Private route
blogRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      body,
      userId
    }: {
      title: string
      body: string
      userId: string
    } = req.body

    const user = await User.findById(userId)

    const newBlog = new Blog({
      title: title as string,
      body: body as string,
      user: user._id as string //! The user is saved in the blog
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  }
)

// DELETE /api/blogs/:id
// Deletes a blog by id
// Private route
blogRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    await Blog.findByIdAndDelete(req.params.id)
      .then(blog => {
        blog
          ? res.status(200).json(blog)
          : res.status(404).json({ message: 'Blog not found' }).end()
      })
      .catch((err: Error) => next(err))
  }
)

// PUT /api/blogs/:id
// Updates a blog by id
// Private route
blogRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      body
    }: {
      title: string
      body: string
    } = req.body

    const blog = {
      title: title as string,
      body: body as string
    }

    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
      .then((updatedBlog: blogType) => {
        res.status(200).json(updatedBlog)
      })
      .catch((err: Error) => next(err))
  }
)
