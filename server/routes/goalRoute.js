import express from "express";

import {
  createGoal,
  deleteGoal,
  getGoals,
  updateGoal,
} from "../controllers/goalController.js";
import { checkMinimumBalance } from "../middlewares/checkMinimumBalance.js";

const router = express.Router();

router.post("/", createGoal);
router.get("/", getGoals);
router.delete("/:goalId", deleteGoal);
router.post("/:id", updateGoal, checkMinimumBalance);

export default router;
