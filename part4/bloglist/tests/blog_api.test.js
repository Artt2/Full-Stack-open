const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  
  expect(response.headers["content-type"]).toMatch(/application\/json/) //test content-type
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)  //test length
})

test("id property exists", async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].author).toBeDefined()
})

test("a valid blog can be added", async() => {
  const newBlog = {
    title: "Title",
    author: "Artt2",
    url: "artt2.com",
    likes: 0
  } 

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)  //test returned 
    .expect('Content-Type', /application\/json/)  //test content-type

    const blogsInEnd = await helper.blogsInDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1) //test length
})

test("a valid blog can be added", async() => {
  const newBlog = {
    title: "No likes in this one",
    author: "Artt2",
    url: "nolikes.com"
  } 

  const response = await api.post("/api/blogs").send(newBlog)

  expect(response.body.likes).toBe(0)
}) 

test("missing title results in 400", async() => {
  const newBlog = {
    author: "Artt2",
    url: "nolikes.com",
    likes: 0
  } 

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
}) 

test("missing url results in 400", async() => {
  const newBlog = {
    title: "This title exists",
    author: "Artt2",
    likes: 0
  } 

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
}) 

afterAll(async () => {
  await mongoose.connection.close()
})