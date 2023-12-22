import {
  Diagnosis,
  Entry,
  Patient,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
} from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const style = {
  border: "solid",
  borderWidth: "2px",
  borderColor: "black",
  padding: "8px",
  margin: "5px",
};

const EntryDetails: React.FC<{
  entry: Entry;
  patient: Patient;
  diagnoses: Diagnosis[];
}> = ({ entry, patient, diagnoses }) => {
  const DiagnoseInfo = (visit: Entry) => {
    if (!patient.entries) {
      return null;
    }

    const diagnosesWithDescriptions: (Diagnosis | undefined)[] =
      visit.diagnosisCodes
        ? visit.diagnosisCodes.map((code) => {
            return diagnoses.find((diagnose) => diagnose.code === code);
          })
        : [];

    return (
      <div>
        {diagnosesWithDescriptions ? (
          <ul>
            {diagnosesWithDescriptions.map((entry: Diagnosis | undefined) => {
              if (!entry) {
                return null;
              }
              return (
                <li key={entry.code}>
                  {entry.code} {entry.name}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  };

  const HospitalEntry: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <div style={style}>
        {entry.date} <LocalHospitalIcon /> {entry.description} <br />
        {entry.diagnosisCodes ? <DiagnoseInfo {...entry} /> : null}
        Discharged: {entry.discharge.date} - {entry.discharge.criteria}
        <br />
        <br />
        Doctor: {entry.specialist}
      </div>
    );
  };

  const OccupationalEntry: React.FC<{
    entry: OccupationalHealthcareEntry;
  }> = ({ entry }) => {
    return (
      <div style={style}>
        {entry.date} <WorkOutlineIcon />
        <br />
        <div>{entry.description}</div>
        {entry.sickLeave ? (
          <div>
            On sick leave: {entry.sickLeave.startDate} -{" "}
            {entry.sickLeave.endDate}
          </div>
        ) : null}
        <br />
        Doctor: {entry.specialist}
      </div>
    );
  };

  const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const heartColor: string =
      entry.healthCheckRating === 0
        ? "green"
        : entry.healthCheckRating === 1
        ? "yellow"
        : entry.healthCheckRating === 2
        ? "orange"
        : "red";

    return (
      <div style={style}>
        <p>
          {entry.date} <MedicalServicesIcon />
          <i>{entry.description}</i>
          <br />
          <br />
          <FavoriteIcon htmlColor={heartColor} />
          <br />
          <br />
          Doctor: {entry.specialist}
        </p>
      </div>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
