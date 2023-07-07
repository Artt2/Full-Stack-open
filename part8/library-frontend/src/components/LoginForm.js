import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({show, setToken, setPage}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)//setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data]) //eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    const res = await login({ variables: { username, password }})

    //if login succeeds, set page to authors and clear fields
    if (res.data !== undefined) {
      setUsername("")
      setPassword("")

      setPage("authors")
    } else {
      console.log("result of login undefined")
    }
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        username<input 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        /><br/>
        password<input 
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        /><br/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm