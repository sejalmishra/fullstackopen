const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLike=0;
  blogs.forEach(blog => {
    totalLike+=blog.likes
  });
  return totalLike;
}

const favouriteBlog = (blogs) => {
  let mostLiked = {
    title: "",
    author: "",
    likes: 0
  }
  blogs.forEach(blog => {
    if(blog.likes>mostLiked.likes){
      mostLiked = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  });
  return mostLiked;
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}