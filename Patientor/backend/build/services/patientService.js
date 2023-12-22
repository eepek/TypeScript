"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getAllNonSensitive = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const generatedId = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: generatedId }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getAllNonSensitive, addPatient };
