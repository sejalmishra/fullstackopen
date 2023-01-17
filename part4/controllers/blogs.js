const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
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
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  try{
  //check for wrong user(tomorrow)
  const blog = await Blog.findById(id)
  if(blog.user.toString() === decodedToken.id.toString()){
    const deletedBlog = await Blog.findByIdAndDelete(id);
    response.status(200).send({
  message: "Resourse deleted successfully",
  deletedId: deletedBlog._id
  })
  }else{
    return response.status(401).json({ error: 'action not allowed' })
  }
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