import axios from "axios";
import { NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  console.log(data);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (patientId: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${patientId}`
  );
  return data;
};

const addPatientEntry = async (patientId: string, entry: NewEntry) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  addPatientEntry,
};
