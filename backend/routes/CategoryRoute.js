import express from "express";
import {getReportCategorys, createReportCategorys, deleteReportCategory} from "../controllers/CategoryController.js";

const router = express.Router();

router.get('/categorys', getReportCategorys);
router.post('/categorys', createReportCategorys);
router.delete('/categorys/:id', deleteReportCategory);

export default router;