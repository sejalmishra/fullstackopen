const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name , password } = request.body;
  if(!username || !password){
    return response.status(400).json({
      error: 'username and password are required'
    })
  }

  if(username.length<3 || password.length<3){
    return response.status(400).json({
      error: 'username or password must be more than 3 characters long'
    })
 }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  })
  try{
  const savedUser = await user.save()
  response.status(201).json(savedUser)
  }catch(error){
    next(error)
 }
})

usersRouter.get('/', async (request, response, next) => {
    try{
    const users = await User.find({}).populate('blogs');
    response.json(users)
    }catch(error){
      next(error)
    }
})

module.exports = usersRouter