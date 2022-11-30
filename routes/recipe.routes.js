import express from "express";
import RecipeModel from "../models/recipe.model.js";

const recipeRoute = express.Router();



//Create - MongoDB
recipeRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newRecipe = await RecipeModel.create(form);

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

export default recipeRoute;
