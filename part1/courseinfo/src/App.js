const App = () => {
  const course =  {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
}

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => (
    <h1>{props.course}</h1>
  )

const Content = (props) => {
  //this should be done in a loop
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Part = (props) => (
      <p>{props.part.name} {props.part.exercises}</p>
  )

const Total = (props) => (
      <p>Number of exercises {props.parts.map(p => p.exercises).reduce((accum, nextVal) => accum + nextVal, 0)}</p>
  )

export default App