import express from "express";
import {getReportCategories, createReportCategories, deleteReportCategory} from "../controllers/CategoryController.js";

const router = express.Router();

router.get('/categories', getReportCategories);
router.post('/categories', createReportCategories);
router.delete('/categories/:id', deleteReportCategory);

export default router;