const Header = ({ course }) => <h2>{course}</h2>

const Sum = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((accumulator, current) => accumulator + current)

  return (
    <b>total of exercises {total}</b>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      {course.parts.map(part =>
        <Part key={part.id} part={part}/>
        )}
      <Sum parts={course.parts} />
    </>
  )
}


export default Course