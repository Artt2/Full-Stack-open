import { DiaryEntryInterface } from "../types"

const DiaryEntry = (props: DiaryEntryInterface) => {
  return (
    <div>
      <h3>{props.date}</h3>
      visibility: {props.visibility}
      <br/>
      weather: {props.weather}
    </div>
  );
};

export default DiaryEntry;