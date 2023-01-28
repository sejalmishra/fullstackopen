import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreareBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  }

    const getAllBlogs = async () => {
    const result = await blogService.getAll() 
    setBlogs(result)
   }

  const handleCreateBlog = async (event, blog) => {
    event.preventDefault();
    try{
      const newBlog = await blogService.create(blog)
      const newBlogObj = {
        author: newBlog.author,
        id: newBlog.id,
        likes: newBlog.likes,
        title: newBlog.title,
        url: newBlog.url
      }
      setBlogs([...blogs,newBlogObj])
    }catch(error) {
      console.log(error)
    }
    }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  if(user===null){
    return (
    <div>
    <h2>Login to application</h2>
    <form onSubmit={handleLogin}>
      <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
    </form>
    </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>
      <CreareBlog handleCreateBlog={handleCreateBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
