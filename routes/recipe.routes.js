import express from "express";
import { disconnect } from "mongoose";
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

//InsertMany - MongoDB
recipeRoute.post("/insertmany", async (req, res) => {
  try {
    const form = req.body;

    //Esta correto?
    const recipesmany = await RecipeModel.insertMany(form);

    return res.status(201).json(recipesmany);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Delete - MongoDB
recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await RecipeModel.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(400).json({ msg: "Receita não encontrada!" });
    }

    const Recipes = await RecipeModel.find();

    return res.status(200).json(Recipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//Edit - MongoDB
recipeRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await recipeRoute.findAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//Disconnect - MongoDB
recipeRoute.post("/disconnect", async (req, res) => {
  try {
    const form = req.body;

    //Desconecta o DB. Esta certo?
    disconnect();

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

export default recipeRoute;
