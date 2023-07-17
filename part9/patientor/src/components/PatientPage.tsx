import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>(); //id from url
  const [patient, setPatient] = useState<Patient | null>(null); //Patient object or null
  
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
            {entry.diagnosisCodes && entry.diagnosisCodes.map((code, j) => (
              <li key={j}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
  
};

export default PatientPage;