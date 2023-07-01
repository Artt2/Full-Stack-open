import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const dispatch = useNotificationDispatch()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      dispatch({
        type: "SET",
        payload: "too short anecdote, must have length 5 or more"
      })
      setTimeout(() => {
        dispatch({type: "RESET"})
      }, 5000);
      return
    }

    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate({
      content: content,
      votes: 0,
    })
    
    dispatch({
      type: "SET",
      payload: `anecdote '${content}' added`
    })
    setTimeout(() => {
      dispatch({type: "RESET"})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm