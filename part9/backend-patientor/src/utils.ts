import { NewPatient, Gender, Entry } from "./types";

/*
  Returns true if param text is a string
*/
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorect or missing name");
  }
  return name;
};

/*
  Returns true if parameter of type string is a date that can be parsed
*/
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

/*
  Takes an unknown as a parameter.
  Returns a string, if the parameter is of type string and can be parsed to a date using isDate
*/
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

/*
  Takes an unknown as a parameter.
  Returns a Gender or an error if parameter not a valid gender.
*/
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};


const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  const validEntryTypes: string[] = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
  
  //check that entries is of type array
  if (!Array.isArray(entries)) {
    throw new Error("Invalid entries data: entries must be an array");
  }
  
  //check that each entry of entries has field "type" that is of validEntryTypes
  return entries.map((entry) => {
    //check that entry is an object, it exists, field type exists, and field of type is string
    if (typeof entry !== "object" || !entry || !("type" in entry) || typeof entry.type !== "string") {
      throw new Error("Invalid entry data");
    }
    
    //type included in validEntryTypes
    if (!validEntryTypes.includes(entry.type)) {  //eslint-disable-line
      throw new Error(`Invalid entry type: ${entry.type}`);
    }

    return entry as Entry;
  });
  
};

/*
  Takes an unknown object as a parameter (req.body of the POST request).
  Returns either an error or a NewPatient.
*/
const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object && 
    "dateOfBirth" in object && 
    "ssn" in object && 
    "gender" in object && 
    "occupation" in object &&
    "entries" in object
    ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;