import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiaryEntryInterface, toNewDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntryInterface[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
}

const create = async (object: toNewDiaryEntry) => {
  return axios
    .post<DiaryEntryInterface>(`${apiBaseUrl}/diaries`, object)
    .then(response => response.data);
};

export default {
  getAll,
  create  
};