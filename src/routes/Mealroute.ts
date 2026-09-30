import { Router } from "express";


import { createMeal,
    getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
 } from "../controllers/Mealcontroller";

const router = Router();

router.post("/", createMeal);
router.get("/", getMeals);
router.get("/:id", getMealById);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);

export default router;