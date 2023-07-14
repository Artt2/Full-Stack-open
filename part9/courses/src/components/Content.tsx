import Part from "./Part"
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <Part key={index} {...part} />
      ))}
    </div>
  )
}

export default Content;