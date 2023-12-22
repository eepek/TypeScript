import patientservice from "../../services/patients";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import EntryForm from "./EntryForm";
import EntryDetails from "./EntryDetails";
import { useEffect, useState } from "react";
import diagnoseservice from "../../services/diagnoses";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const ShowPatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const patientId = useParams().id;

  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        const fetched = await patientservice.getPatient(patientId);
        setPatient(fetched);
      };
      const fetchDiagnoses = async () => {
        const fetchedDiagnoses = await diagnoseservice.getAllDiagnoses();
        setDiagnoses(fetchedDiagnoses);
      };
      void fetchPatient();
      void fetchDiagnoses();
    }
  }, []); //eslint-disable-line

  if (!patient) {
    return null;
  }

  const errorStyle = {
    width: "100%",
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: "5px",
    margin: "10px",
    padding: "5px",
  };

  const ErrorBanner = () => {
    return <div style={errorStyle}>{errorMessage}</div>;
  };

  const PatientInfo = () => {
    const icon =
      patient.gender === "male" ? (
        <MaleIcon />
      ) : patient.gender === "female" ? (
        <FemaleIcon />
      ) : (
        <QuestionMarkIcon />
      );

    return (
      <div>
        <br></br>
        <h2>
          {patient.name} {icon}
        </h2>

        <p>{patient.ssn}</p>
        <p>{patient.occupation}</p>
      </div>
    );
  };

  return (
    <div>
      {errorMessage ? <ErrorBanner></ErrorBanner> : null}
      <PatientInfo />
      <EntryForm
        patient={patient}
        diagnoses={diagnoses}
        setPatient={setPatient}
        setErrorMessage={setErrorMessage}
      ></EntryForm>
      <h3>entries</h3>
      {patient.entries.map((entry) => {
        return (
          <EntryDetails
            key={entry.id}
            entry={entry}
            patient={patient}
            diagnoses={diagnoses}
          />
        );
      })}
    </div>
  );
};

export default ShowPatient;
