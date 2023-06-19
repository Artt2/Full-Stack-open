const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeList = blogs.map(blog => blog.likes)
  
  const total = likeList.reduce((accumulator, current) => accumulator + current, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const favorite = blogs.reduce((maxBlog, currentBlog) => maxBlog.likes > currentBlog.likes ? maxBlog : currentBlog)
    const obj = {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
    return obj
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorsGrouped = _.groupBy(blogs, "author") //like scala's blogs.groupBy(_.author)

  //maxBy returns the max elem of array based on length of written blogs
  //maxBy first parameter is the keys of authorsGrouped (unique authors)
  //maxBy seconds param is the function that the first is maxed with
  const mostBlog = _.maxBy(_.keys(authorsGrouped), (author) => authorsGrouped[author].length)
  return {
    author: mostBlog,
    blogs: authorsGrouped[mostBlog].length,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  //group posts to authors
  const authorsGrouped = _.groupBy(blogs, "author")

  //maxBy likes
  const mostLiked = _.maxBy(_.keys(authorsGrouped), (author) => {
    const likes = authorsGrouped[author].reduce((accumulator, current) => accumulator + current.likes, 0)
    return likes
  })
  
  const mostLikes = authorsGrouped[mostLiked].reduce((accumulator, current) => accumulator + current.likes, 0)

  return {
    author: mostLiked,
    likes: mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes
}