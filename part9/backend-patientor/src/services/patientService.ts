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
    ...patient
  };
  
  patients.push(newPerson);
  return newPerson;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};