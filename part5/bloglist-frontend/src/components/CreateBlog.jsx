import { useState } from "react"
import blogService from '../services/blogs'

const CreareBlog = ({handleCreateBlog}) => {
    const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
    })


    return(
  <div>
    <h2>create new</h2>
    <form onSubmit={(event) => {handleCreateBlog(event,blog)
         setBlog({
        title: '',
        author: '',
        url: '',
        likes: ''
    });
    }}>
    <div>
    title: 
    <input
            type="text"
            value={blog.title}
            name="title"
            onChange={({ target }) => setBlog({...blog, title: target.value})}
    />
    </div>
    <div>
    author: 
    <input
            type="text"
            value={blog.author}
            name="author"
            onChange={({ target }) => setBlog({...blog, author: target.value})}
    />
    </div>
    <div>
    url: 
    <input
            type="text"
            value={blog.url}
            name="url"
            onChange={({ target }) => setBlog({...blog, url: target.value})}
    />
    </div>
    <div>
    likes: 
    <input
            type="text"
            value={blog.likes}
            name="likes"
            onChange={({ target }) => setBlog({...blog, likes: target.value})}
    />
    </div>
    <button type="submit">create</button>
    </form>
  </div>)  
}

export default CreareBlog