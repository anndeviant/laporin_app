import express from "express";
import {getReports, getReportsById, createReports, updateReport, deleteReport} from "../controllers/ReportController.js";

const router = express.Router();

router.get('/reports', getReports);
router.get('/reports/:id', getReportsById);
router.post('/reports', createReports);
router.patch('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

export default router;