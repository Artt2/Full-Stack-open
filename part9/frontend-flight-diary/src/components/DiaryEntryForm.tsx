import React, { useState } from "react";
import { Weather, Visibility } from "../types";
import { DiaryEntryInterface } from "../types";
import diaryEntryService from "../services/diaryEntries";
import axios from "axios";

interface DiaryEntryFormProps {
  setNotificationMsg: React.Dispatch<React.SetStateAction<string>>;
  diaryEntries: DiaryEntryInterface[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntryInterface[]>>;
}

// MAKE NOTIFICATION WORK, WHEN BACKEND FAILS TO ADD! RENAME TO FRONTEND

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    diaryEntryService.create({
      date: date,
      weather: weather.toLowerCase(), //backend fails with "Sunny" instead of "sunny"
      visibility: visibility.toLowerCase(),
      comment: comment
    }).then(data => {
      props.setDiaryEntries(props.diaryEntries.concat(data))
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        console.error(error.response);

        if (error.response && error.response.data) {
          props.setNotificationMsg(error.response.data);
          setTimeout(() => {
            props.setNotificationMsg("");
          }, 5000);
        }
      } else {
        console.error(error);
      }
    })

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
