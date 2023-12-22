import express from "express";
import patientService from "../services/patientService";
import toNewPatient, { toNewEntryForPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(patientService.getAllNonSensitive());
});

patientRouter.get("/:id", (req, res) => {
  res.json(patientService.getPatient(req.params.id.toString()));
});

patientRouter.post("/", (req, res) => {
  const checkEntry = toNewPatient(req.body);
  const newEntry = patientService.addPatient(checkEntry);
  res.status(200).json(newEntry);
});

patientRouter.post("/:id/entries", (req, res) => {
  const checkEntry = toNewEntryForPatient(req.body);
  const patientWithNewEntry = patientService.addEntryForPatient(
    req.params.id.toString(),
    checkEntry
  );
  res.status(200).json(patientWithNewEntry);
});

export default patientRouter;
