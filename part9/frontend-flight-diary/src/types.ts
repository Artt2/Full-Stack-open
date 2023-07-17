export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntryInterface {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export interface toNewDiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntryInterface, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntryInterface, 'comment'>;
