import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteChange(state, action) {
      const changedAnecdote = action.payload //payload is the modified object returned by PUT request
      
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)  //push can be used here (because of toolkit?)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteChange, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote({
      content: content,
      votes: 0,
    })
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdoteObject) => {
  return async (dispatch) => {
    const modifiedAnecdote = await anecdoteService.voteAnecdote({ //PUT returns modified object
      ...anecdoteObject,
      votes: anecdoteObject.votes + 1,
    })

    dispatch(voteChange(modifiedAnecdote))
  }
}

export default anecdoteSlice.reducer