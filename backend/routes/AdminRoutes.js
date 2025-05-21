import express from "express";
import {
  getReports,
  getReportsById,
  createReports,
  updateReport,
  deleteReport,
} from "../controllers/ReportController.js";
import {
  getReportCategories,
  createReportCategories,
  deleteReportCategory,
} from "../controllers/CategoryController.js";
import {
  getGovernmentAgencies,
  createGovernmentAgencies,
  deleteGovernmentAgency,
  updateGovernmentAgency,
} from "../controllers/AgencyController.js";

const router = express.Router();

// Admin Report Routes
router.get("/reports", getReports);
router.get("/reports/:id", getReportsById);
router.post("/reports", createReports);
router.patch("/reports/:id", updateReport);
router.delete("/reports/:id", deleteReport);

// Admin Category Routes
router.get("/categories", getReportCategories);
router.post("/categories", createReportCategories);
router.delete("/categories/:id", deleteReportCategory);

// Admin Agency Routes
router.get("/agencies", getGovernmentAgencies);
router.post("/agencies", createGovernmentAgencies);
router.patch("/agencies/:id", updateGovernmentAgency);
router.delete("/agencies/:id", deleteGovernmentAgency);

export default router;
