import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Diagnosis, Patient } from "../types";

import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";


const PatientPage = () => {
  const { id } = useParams<{ id: string }>(); //id from url
  const [patient, setPatient] = useState<Patient | null>(null); //Patient object or null
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null)  //List of Diagnoses or null
  
  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const fetchedDiagnoses: Diagnosis[] = await diagnosisService.getAll();
        setDiagnoses(fetchedDiagnoses);
      } catch (error) {
        console.log("error when fetching diagnoses data");
      }
    }

    fetchDiagnoses();
  }, [])

  // get patient info
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient: Patient = await patientService.getPatient(id);
          setPatient(fetchedPatient);
        } catch (error) {
          console.log("error when fetching patient data");
        }
      }
    };

    if (id) {
      void fetchPatient();
    }
  }, [id]);

  if (!id || !patient) {
    return (<p>Missing id or invalid id.</p>);
  }

  //const patient: Patient = await patientService.getPatient(id);

  return (
    <div>
      <br/>
      <h2>{patient.name}</h2>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((entry, i) => ( 
        <div key={i}>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((code, j) => {
              const diagnosis = diagnoses?.find(d => d.code === code);
              const diagnosisName = diagnosis ? diagnosis.name : "";

              return (
                <li key={j}>
                  {code} {diagnosisName}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
  
};

export default PatientPage;