import {
  NewPatientEntry,
  Gender,
  HealthCheckRating,
  NewEntry,
  Discharge,
  SickLeave,
  Diagnose,
} from "./types/types";

//Helper functions
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  const reg = /.{4}-.{2}-.{2}/gm;
  if (!date.match(reg)) {
    return false;
  }
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(gender);
};

const isHealthRating = (
  healthRating: number
): healthRating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((value) => value)
    .includes(healthRating);
};

const parseStringEntries = (entry: unknown, field: string): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Missing or invalid parameters in ${field}`);
  }

  return entry;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid date input");
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender input");
  }

  return gender;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" || value instanceof Number;
};

const parseHealthRating = (healthRating: unknown): HealthCheckRating => {
  if (!isNumber(healthRating) || !isHealthRating(healthRating)) {
    throw new Error("Invalid healthcheckrating input");
  }

  return healthRating;
};

//Main function
const toNewPatient = (patient: unknown): NewPatientEntry => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in patient &&
    "occupation" in patient &&
    "dateOfBirth" in patient &&
    "ssn" in patient &&
    "gender" in patient &&
    "entries" in patient
  ) {
    return {
      name: parseStringEntries(patient.name, "name"),
      dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
      ssn: parseStringEntries(patient.ssn, "ssn"),
      occupation: parseStringEntries(patient.occupation, "occupation"),
      gender: parseGender(patient.gender),
      entries: [],
    };
  }

  throw new Error("Missing or invalid parameters!");
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discard data");
  }

  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDateOfBirth(discharge.date),
      criteria: parseStringEntries(discharge.criteria, "discharge criteria"),
    };
  }

  throw new Error("Missing or invalid data in discharge");
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("incorrect or missing sick leave data");
  }

  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    return {
      startDate: parseDateOfBirth(sickLeave.startDate),
      endDate: parseDateOfBirth(sickLeave.endDate),
    };
  }

  throw new Error("Incorrect sickleave data");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object as Array<Diagnose["code"]>;
};

const newHealthCheckEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missign data");
  }

  if (
    "type" in entry &&
    "date" in entry &&
    "specialist" in entry &&
    "description" in entry &&
    "healthCheckRating" in entry
  ) {
    return {
      type: "HealthCheck",
      date: parseDateOfBirth(entry.date),
      specialist: parseStringEntries(entry.specialist, "specialist"),
      description: parseStringEntries(entry.description, "description"),
      healthCheckRating: parseHealthRating(entry.healthCheckRating),
    };
  }

  throw new Error("Missing or invalid parameters!");
};

const newHospitalEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missign data");
  }

  if (
    "type" in entry &&
    "date" in entry &&
    "specialist" in entry &&
    "description" in entry &&
    "discharge" in entry
  ) {
    return {
      type: "Hospital",
      date: parseDateOfBirth(entry.date),
      specialist: parseStringEntries(entry.specialist, "specialist"),
      description: parseStringEntries(entry.description, "description"),
      discharge: parseDischarge(entry.discharge),
    };
  }

  throw new Error("Missing or invalid parameters!");
};

const newOccupationalEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missign data");
  }

  if (
    "type" in entry &&
    "date" in entry &&
    "specialist" in entry &&
    "description" in entry &&
    "sickLeave" in entry &&
    "employerName" in entry
  ) {
    return {
      type: "OccupationalHealthcare",
      date: parseDateOfBirth(entry.date),
      specialist: parseStringEntries(entry.specialist, "specialist"),
      description: parseStringEntries(entry.description, "description"),
      sickLeave: parseSickLeave(entry.sickLeave),
      employerName: parseStringEntries(entry.employerName, "employer name"),
    };
  }

  throw new Error("Missing or invalid parameters!");
};

export const toNewEntryForPatient = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }

  let newEntry: NewEntry;
  if (
    "type" in entry &&
    "date" in entry &&
    "specialist" in entry &&
    "description" in entry
  ) {
    switch (entry.type) {
      case "HealthCheck":
        newEntry = newHealthCheckEntry(entry);
        if ("diagnosisCodes" in entry) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
        }
        return newEntry;
      case "Hospital":
        newEntry = newHospitalEntry(entry);
        if ("diagnosisCodes" in entry) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
        }
        return newEntry;
      case "OccupationalHealthcare":
        newEntry = newOccupationalEntry(entry);
        if ("diagnosisCodes" in entry) {
          newEntry.diagnosisCodes = parseDiagnosisCodes(entry);
        }
        return newEntry;
      default:
        throw new Error("Missing or invalid parameters!");
    }
  }

  throw Error("Missing or invalid parameters!");
};

export default toNewPatient;
