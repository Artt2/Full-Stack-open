interface ContextProps {
  name: string
  exerciseCount: number
}

const Context = (props: ContextProps) => {
  return (<p>{props.name} {props.exerciseCount}</p>)
}

export default Context;