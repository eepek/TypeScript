"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types/types");
//Helper functions
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    const reg = /.{4}-.{2}-.{2}/gm;
    if (!date.match(reg)) {
        return false;
    }
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((value) => value.toString())
        .includes(gender);
};
const parseStringEntries = (entry) => {
    if (!entry || !isString(entry)) {
        throw new Error("Missing or invalid parameters");
    }
    return entry;
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Invalid date input");
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Invalid gender input");
    }
    return gender;
};
//Main function
const toNewPatient = (patient) => {
    if (!patient || typeof patient !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in patient &&
        "occupation" in patient &&
        "dateOfBirth" in patient &&
        "ssn" in patient &&
        "gender" in patient) {
        return {
            name: parseStringEntries(patient.name),
            dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
            ssn: parseStringEntries(patient.ssn),
            occupation: parseStringEntries(patient.occupation),
            gender: parseGender(patient.gender),
        };
    }
    throw new Error("Missing or invalid parameters!");
};
exports.default = toNewPatient;
