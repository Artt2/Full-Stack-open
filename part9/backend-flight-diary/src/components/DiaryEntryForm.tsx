import React, { useState } from "react";
import { Weather, Visibility } from "../types";
import { DiaryEntryInterface } from "../types";
import diaryEntryService from "../services/diaryEntries";

interface DiaryEntryFormProps {
  setNotificationMsg: React.Dispatch<React.SetStateAction<string>>;
  diaryEntries: DiaryEntryInterface[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntryInterface[]>>;
}

// MAKE NOTIFICATION WORK, WHEN BACKEND FAILS TO ADD!

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("adding new diary...");
    console.log(date);
    console.log(visibility);
    console.log(weather);
    console.log(comment);

    try {
      diaryEntryService.create({
        date: date,
        weather: weather.toLowerCase(), //backend fails with "Sunny" instead of "sunny"
        visibility: visibility.toLowerCase(),
        comment: comment
      }).then(data => {
        console.log("data received");
        props.setDiaryEntries(props.diaryEntries.concat(data))
      })
    } catch (error) {
      console.log("encountered an error");
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <div>
          date
          <input type="date"
            value={date}
            onChange={({target}) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          {(Object.keys(Visibility) as Array<keyof typeof Visibility>).map((v) => (
            <label key={v}>
              <input 
                type="radio"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          weather
          {(Object.keys(Weather) as Array<keyof typeof Weather>).map((w) => (
            <label key={w}>
              <input 
                type="radio"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          comment
          <input type="text"
            value={comment}
            onChange={({target}) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
};

export default DiaryEntryForm;
