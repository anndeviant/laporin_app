import express from "express";
import {getGovernmentAgencies, createGovernmentAgencies, deleteGovernmentAgency, updateGovernmentAgency} from "../controllers/AgencyController.js";

const router = express.Router();

router.get('/agencies', getGovernmentAgencies);
router.post('/agencies', createGovernmentAgencies);
router.patch('/agencies/:id', updateGovernmentAgency);
router.delete('/agencies/:id', deleteGovernmentAgency);

export default router;