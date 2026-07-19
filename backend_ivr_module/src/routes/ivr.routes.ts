import { Router } from "express";
import {
  getIvrFeedbackLogById,
  getIvrFeedbackLogs,
  getIvrHistory,
  getIvrHistoryById,
  patchIvrHistoryStatus,
  postRetryIvrDispatch,
} from "../controllers/ivr.controller.js";

const router = Router();

router.get("/history", getIvrHistory);
router.get("/history/:id", getIvrHistoryById);

router.get("/feedback", getIvrFeedbackLogs);
router.get("/feedback/:id", getIvrFeedbackLogById);

router.patch("/history/:id/status", patchIvrHistoryStatus);
router.post("/history/:id/retry", postRetryIvrDispatch);

export default router;
