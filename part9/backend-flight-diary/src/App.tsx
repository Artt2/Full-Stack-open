import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "./constants";

import { DiaryEntryInterface } from "./types";
import diaryEntryService from "./services/diaryEntries";

import DiaryEntry from "./components/DiaryEntry";
import DiaryEntryForm from "./components/DiaryEntryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntryInterface[]>([]);
  const [notificationMsg, setNotificationMsg] = useState("");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaryEntries = async () => {
      const diaryEntries = await diaryEntryService.getAll();
      setDiaryEntries(diaryEntries);
    }
    void fetchDiaryEntries();
  }, []);

  return (
    <div>
      <Notification message={notificationMsg} />
      <h2>Add new entry</h2>
      <DiaryEntryForm setNotificationMsg={setNotificationMsg} diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries}/>
      <h2>Diary entries</h2>
      {diaryEntries.map((d, index) => (
        <DiaryEntry key={index} {...d} />
      ))}
    </div>
  );
};

export default App;