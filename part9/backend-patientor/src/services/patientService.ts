import patientData from "../../data/patients";

import { NonSensitivePatient, Patient, NewPatient } from "../types";

import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
/*
  Takes NewPatient as a parameter (a Patient without a ID).
  Returns Patient (id created with uuid).
*/
const addPatient = (patient: NewPatient): Patient => {
  const newPerson = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    entries: [],
    ...patient
  };
  
  patients.push(newPerson);
  return newPerson;
};

const getNonSensitivePatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find(p => p.id === id);
  
  if (patient) {
    return patient;
  }
  return undefined;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getNonSensitivePatient
};