import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    //Recipes schema
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    ingredients: [{ type: String }],
    cousine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: [
        "breakfast",
        "main_course",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
    },
    image: {
      type: String,
      required: true,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = model("Recipe", recipeSchema);

export default RecipeModel;
