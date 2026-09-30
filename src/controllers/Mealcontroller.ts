import { Request, Response } from "express";
import { Meal } from "../models/meal";

// POST /meals
export const createMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, image, category, place, cookId } = req.body;

    if (!name || !price || !image || !category || !place || !cookId) {
      res.status(400).json({ message: "All meal fields are required" });
      return;
    }

    const meal = await Meal.create({ name, description, price, image, category, place, cookId });
    res.status(201).json({ meal });
  } catch (err) {
    res.status(500).json({ message: "Failed to create meal", error: (err as Error).message });
  }
};

// GET /meals  (supports ?category=Main+Course)
export const getMeals = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter = category ? { category, available: true } : { available: true };

    const meals = await Meal.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ meals });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};

// GET /meals/:id
export const getMealById = async (req: Request, res: Response): Promise<void> => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    res.status(200).json({ meal });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meal" });
  }
};

// PUT /meals/:id
export const updateMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    res.status(200).json({ meal });
  } catch (err) {
    res.status(500).json({ message: "Failed to update meal", error: (err as Error).message });
  }
};

// DELETE /meals/:id
export const deleteMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
      return;
    }

    res.status(200).json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete meal" });
  }
};