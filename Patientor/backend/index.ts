import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoseRouter";
import patientRouter from "./routes/patientRouter";

const app = express();

// Then pass these options to cors:
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

// https://feqy.medium.com/error-handling-in-nodets-f051e385e87e used as source for this middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  return res.status(400).send(err.message);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});
