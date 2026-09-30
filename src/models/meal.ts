import { Schema, model, Document } from "mongoose";

export type MealCategory = "Main Course" | "Desserts" | "Drinks" | "Snacks";

export interface IMeal extends Document {
  name: string;
  description?: string;
  price: number;
  image: string;
  category: MealCategory;
  place: string;
  cookId: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mealSchema = new Schema<IMeal>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["Main Course", "Desserts", "Drinks", "Snacks"],
      required: true,
    },
    place: { type: String, required: true, trim: true },
    cookId: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Meal = model<IMeal>("Meal", mealSchema);