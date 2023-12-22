import express from "express";
import diagnoseService from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
  res.json(diagnoseService.getAll());
});

export default diagnoseRouter;
