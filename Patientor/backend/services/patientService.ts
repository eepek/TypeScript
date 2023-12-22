import {
  Patient,
  NonSensitive,
  NewPatientEntry,
  NewEntry,
  Entry,
} from "../types/types";
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getAllNonSensitive = (): NonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error("Patient not found");
  }
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const generatedId: string = uuid();
  const newPatient = {
    id: generatedId,
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntryForPatient = (id: string, entry: NewEntry): Patient => {
  const patient_id = patients.findIndex((patient) => patient.id == id);
  const generatedId: string = uuid();
  const newPatientEntry: Entry = {
    id: generatedId,
    ...entry,
  };
  patientData[patient_id].entries.push(newPatientEntry);
  return getPatient(id);
};

export default {
  getAllNonSensitive,
  addPatient,
  getPatient,
  addEntryForPatient,
};
