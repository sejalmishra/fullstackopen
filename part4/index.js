const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then((result) => {
   logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.userExtractor,blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)