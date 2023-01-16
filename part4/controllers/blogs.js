const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


blogsRouter.get('/', async (request, response, next) => {
 try{
      const blogs = await Blog.find({}).populate('user');
      if(blogs){
        response.json(blogs)
      }
    }catch(error){
      next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  try{
    const createdBlog = await blog.save();
    user.blogs = user.blogs.concat(createdBlog._id)
    await user.save()
    response.status(201).json(createdBlog)
  }catch(error){
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const {id} = request.params
  try{
  const deletedBlog = await Blog.findByIdAndDelete(id)
  response.status(200).send({
  message: "Resourse deleted successfully",
  deletedId: deletedBlog._id
  })
  }catch(error){
  next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const {id} = request.params;
  const body = request.body;
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, body , {new: true});
    if(updatedBlog){
      response.status(200).json(updatedBlog)
    }
  }catch(error){
    next(error)
  }
})

module.exports = blogsRouter