import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo component', () => {
  const onClickDelete = jest.fn()

  const onClickComplete = jest.fn()

  const todo = { text: 'Test todo', done: false }
  render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete}/>)
  
  const todoTextElement = screen.getByText('Test todo')
  expect(todoTextElement).toBeInTheDocument()
});