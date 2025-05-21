import express from "express";
import {
  getReports,
  getReportsById,
  createReports,
} from "../controllers/ReportController.js";
import { getReportCategories } from "../controllers/CategoryController.js";
import { getGovernmentAgencies } from "../controllers/AgencyController.js";

const router = express.Router();

// Public Report Routes
router.get("/reports", getReports);
router.get("/reports/:id", getReportsById);
router.post("/reports", createReports);

// Public Category Routes
router.get("/categories", getReportCategories);

// Public Agency Routes
router.get("/agencies", getGovernmentAgencies);

export default router;
