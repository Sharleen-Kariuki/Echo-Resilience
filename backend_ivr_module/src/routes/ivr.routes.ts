import { Router } from "express";
import {
  getIvrFeedbackLogById,
  getIvrFeedbackLogs,
  getIvrHistory,
  getIvrHistoryById,
  patchIvrHistoryStatus,
  postDispatchSms,
  postRetryIvrDispatch,
} from "../controllers/ivr.controller.js";
import {
  postBroadcast,
  postVoiceCallback,
  postVoiceStatusCallback,
} from "../controllers/broadcast.controller.js";

const router = Router();

router.get("/history", getIvrHistory);
router.get("/history/:id", getIvrHistoryById);

router.get("/feedback", getIvrFeedbackLogs);
router.get("/feedback/:id", getIvrFeedbackLogById);

router.patch("/history/:id/status", patchIvrHistoryStatus);
router.post("/history/:id/retry", postRetryIvrDispatch);
router.post("/history/:id/dispatch-sms", postDispatchSms);
router.post("/history/:id/broadcast", postBroadcast);
router.post("/voice-callback", postVoiceCallback);
router.post("/voice-status-callback", postVoiceStatusCallback);

export default router;
