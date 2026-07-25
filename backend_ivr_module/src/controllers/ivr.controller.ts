import type { Request, Response, NextFunction } from "express";
import {
  dispatchSmsForHistory,
  findIvrFeedbackLogById,
  findIvrFeedbackLogs,
  findIvrHistory,
  findIvrHistoryById,
  retryIvrDispatch,
  updateIvrHistoryStatus,
} from "../services/ivr.service.js";
import {
  validateDispatchSmsPayload,
  validatePositiveInteger,
  validateUpdateIvrStatusPayload,
} from "../validators/ivr.validator.js";

export async function getIvrHistory(_req: Request, res: Response, next: NextFunction) {
  try {
    const history = await findIvrHistory();
    return res.status(200).json({ data: history });
  } catch (error) {
    return next(error);
  }
}

export async function getIvrHistoryById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = validatePositiveInteger(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid IVR history id" });
    }

    const historyItem = await findIvrHistoryById(id);

    if (!historyItem) {
      return res.status(404).json({ message: "IVR history item not found" });
    }

    return res.status(200).json({ data: historyItem });
  } catch (error) {
    return next(error);
  }
}

export async function getIvrFeedbackLogs(_req: Request, res: Response, next: NextFunction) {
  try {
    const feedbackLogs = await findIvrFeedbackLogs();
    return res.status(200).json({ data: feedbackLogs });
  } catch (error) {
    return next(error);
  }
}

export async function getIvrFeedbackLogById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = validatePositiveInteger(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid feedback log id" });
    }

    const feedbackLog = await findIvrFeedbackLogById(id);

    if (!feedbackLog) {
      return res.status(404).json({ message: "Feedback log not found" });
    }

    return res.status(200).json({ data: feedbackLog });
  } catch (error) {
    return next(error);
  }
}

export async function patchIvrHistoryStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const id = validatePositiveInteger(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid IVR history id" });
    }

    const validation = validateUpdateIvrStatusPayload(req.body);

    if (!validation.valid || !validation.data) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: validation.errors,
      });
    }

    const updated = await updateIvrHistoryStatus(id, validation.data);

    if (!updated) {
      return res.status(404).json({ message: "IVR history item not found" });
    }

    return res.status(200).json({
      message: "IVR history status updated successfully",
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
}

export async function postDispatchSms(req: Request, res: Response, next: NextFunction) {
  try {
    const id = validatePositiveInteger(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid IVR history id" });
    }

    const validation = validateDispatchSmsPayload(req.body);

    if (!validation.valid || !validation.data) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: validation.errors,
      });
    }

    const result = await dispatchSmsForHistory(id, validation.data.phoneNumbers);

    if (!result) {
      return res.status(404).json({ message: "IVR history item not found" });
    }

    return res.status(200).json({
      message: "SMS dispatch complete",
      provider: result.provider,
      smsMessage: result.message,
      recipients: result.recipients,
      successCount: result.successCount,
      failureCount: result.failureCount,
      data: result.historyItem,
      results: result.results,
    });
  } catch (error) {
    return next(error);
  }
}

export async function postRetryIvrDispatch(req: Request, res: Response, next: NextFunction) {
  try {
    const id = validatePositiveInteger(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid IVR history id" });
    }

    const result = await retryIvrDispatch(id);

    if (!result) {
      return res.status(404).json({ message: "IVR history item not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
