import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likePost = async (blogObject, urlId) => {
  const response = await axios.put(`${baseUrl}/${urlId}`, blogObject)
  return response.data
}

const removeBlog = async (blogID, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  await axios.delete(`${baseUrl}/${blogID}`, config)
}


export default { setToken, getAll, create, likePost, removeBlog }