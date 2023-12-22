import patientservice from "../../services/patients";
import { Diagnosis, Patient, NewEntry, NewBaseInfo } from "../../types";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import { isAxiosError } from "axios";

const EntryForm = ({
  patient,
  diagnoses,
  setPatient,
  setErrorMessage,
}: {
  patient: Patient;
  diagnoses: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [entryType, setEntryType] = useState("default");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("0");
  const [employer, setEmployer] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [enteredDiagnoseCodes, setDiagnoseCodes] = useState<Array<string>>([
    "default",
  ]);
  const diagnoseCodes = diagnoses.map((diagnose) => diagnose.code);

  const formStyle = {
    border: "dotted",
    borderWidth: "2px",
    borderColor: "black",
    padding: "10px",
  };

  const clearFields = () => {
    //Someday I will make a prettier version of this
    setEntryType("default");
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("0");
    setEmployer("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
    setDiagnoseCodes(["default"]);
  };

  useEffect(() => {
    clearFields();
  }, []);

  const onTypeChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value as string);
  };

  const HealthCheckRating = () => {
    const onHCRchange = (event: SelectChangeEvent<string>) => {
      setHealthCheckRating(event.target.value);
    };

    return (
      <>
        <br />
        <InputLabel id="hcr">Healthcheck rating</InputLabel>
        <Select id="hcr" value={healthCheckRating} onChange={onHCRchange}>
          <MenuItem value="0">Healthy</MenuItem>
          <MenuItem value="1">Low Risk</MenuItem>
          <MenuItem value="2">High RIsk</MenuItem>
          <MenuItem value="3">Critical Risk</MenuItem>
        </Select>
      </>
    );
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewBaseInfo = {
      date: date,
      description: description,
      specialist: specialist,
    };

    if (enteredDiagnoseCodes.length !== 0) {
      newEntry.diagnosisCodes = enteredDiagnoseCodes;
    }

    const sendEntry = async (entry: NewEntry) => {
      try {
        const reply: Patient = await patientservice.addPatientEntry(
          patient.id,
          entry
        );
        setPatient(reply);
        clearFields();
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Encountered unknown error");
        }
        setTimeout(() => setErrorMessage(null), 5000);
      }
    };

    switch (entryType) {
      case "HealthCheck":
        const newHealthCheckEntry: NewEntry = {
          ...newEntry,
          type: entryType,
          healthCheckRating: Number(parseInt(healthCheckRating)),
        };
        sendEntry(newHealthCheckEntry);
        return;

      case "OccupationalHealthcare":
        const newOccupationalEntry: NewEntry = {
          ...newEntry,
          type: entryType,
          employerName: employer,
          sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        };
        sendEntry(newOccupationalEntry);
        return;
      case "Hospital":
        const newHospitalEntry: NewEntry = {
          ...newEntry,
          type: entryType,
          discharge: { criteria: dischargeCriteria, date: dischargeDate },
        };
        sendEntry(newHospitalEntry);
        return;
      default:
        throw new Error(`Unhandled discriminated union member: ${entryType})}`);
    }
  };

  const onDiagnosisEntry = (event: SelectChangeEvent<string[]>) => {
    const selections: string[] = event.target.value as string[];
    if (selections.length === 1 && selections[0] === "default") {
      setDiagnoseCodes([]);
    } else {
      const diagnosisCodes = selections.filter((code) => code != "default");
      setDiagnoseCodes(diagnosisCodes);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <InputLabel id="entry-type">Entry type</InputLabel>
        <Select
          labelId="entry-type"
          value={entryType}
          onChange={onTypeChange}
          label="Entry type"
        >
          <MenuItem value="default">Select Entry</MenuItem>
          <MenuItem value="HealthCheck">Healthcheck entry</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational entry</MenuItem>
          <MenuItem value="Hospital">Hospital entry</MenuItem>
        </Select>
        <br />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          value={description}
          sx={{ width: "100%" }}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <br />
        <InputLabel id="entry-date">Entry date</InputLabel>
        <Input
          type="date"
          id="entry-date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br></br>
        <TextField
          id="specialist"
          label="Specialist"
          variant="standard"
          value={specialist}
          sx={{ width: "100%" }}
          onChange={({ target }) => setSpecialist(target.value)}
        ></TextField>
        <br />
        <br />
        <InputLabel id="diagnose-codes">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnose-codes"
          multiple
          value={enteredDiagnoseCodes}
          onChange={(entry) => onDiagnosisEntry(entry)}
        >
          <MenuItem value="default">Select diagnose codes</MenuItem>
          {diagnoseCodes.map((diagnose) => (
            <MenuItem key={diagnose} value={diagnose}>
              {diagnose}
            </MenuItem>
          ))}
        </Select>
        <br />
        {entryType === "HealthCheck" ? (
          <HealthCheckRating />
        ) : entryType === "OccupationalHealthcare" ? (
          <>
            <br />
            <TextField
              label="Employer"
              variant="standard"
              sx={{ width: "100%" }}
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            ></TextField>
            <br />
            <br />
            <InputLabel id="sick-leave-start">Sickleave start date:</InputLabel>
            <Input
              type="date"
              id="sick-leave-start"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <br />
            <br />
            <InputLabel id="sick-leave-end">Sickleave end date:</InputLabel>
            <Input
              type="date"
              id="sick-leave-end"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        ) : entryType === "Hospital" ? (
          <>
            <br />
            <InputLabel id="discharge-date">Discharge date</InputLabel>
            <Input
              type="date"
              id="discharge-date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <br />
            <br />
            <TextField
              label="Discharge criteria"
              sx={{ width: "100%" }}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        ) : null}
        <br />
        <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
