import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = (props: CoursePart) => {
  switch(props.kind) {
    case "basic":
      return (
        <div>
          <b>{props.name} {props.exerciseCount}</b>
          <p>{props.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <b>{props.name} {props.exerciseCount}</b>
          <p>project exercises {props.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <b>{props.name} {props.exerciseCount}</b>
          <p>{props.description}</p>
          <p>submit to {props.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <b>{props.name} {props.exerciseCount}</b>
          <p>{props.description}</p>
          required skills: {props.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(props);
  }
};

export default Part;