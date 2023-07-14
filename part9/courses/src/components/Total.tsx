interface CoursePartProps {
  name: string
  exerciseCount: number
}

interface TotalProps {
  courseParts: CoursePartProps[]
}

const Total = (props: TotalProps) => {
  return (<p>{props.courseParts.reduce((c,p) => c + p.exerciseCount, 0)}</p>)
}

export default Total