import { useEffect, useState } from "react"
import loginService from "../services/login"
import { Table } from "react-bootstrap"

const Users = () => {
  const [usersFromDatabase, setUsersFromDatabase] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await loginService.getAll()
      setUsersFromDatabase(users)
    }

    fetchUsers()
  }, [])

  const countBlogs = (username) => {
    const user = usersFromDatabase.find((user) => user.username === username)
    return user ? String(user.blogs.length) : "0"
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersFromDatabase.map((user) => (
            <tr key={user.username}>
              <td>{user.name}</td>
              <td>{countBlogs(user.username)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )

}

export default Users