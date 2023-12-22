"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const patientRouter = express_1.default.Router();
patientRouter.get("/", (_req, res) => {
    res.json(patientService_1.default.getAllNonSensitive());
});
patientRouter.post("/", (req, res) => {
    const checkEntry = (0, utils_1.default)(req.body);
    const newEntry = patientService_1.default.addPatient(checkEntry);
    res.status(200).json(newEntry);
});
exports.default = patientRouter;
