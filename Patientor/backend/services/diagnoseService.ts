import diagnoseData from "../data/diagnoses";
import { Diagnose } from "../types/types";

const diagnoses: Diagnose[] = diagnoseData;

const getAll = () => {
  return diagnoses;
};

export default { getAll };
