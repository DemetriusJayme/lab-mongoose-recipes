import express from "express";
import { disconnect } from "mongoose";
import RecipeModel from "../models/recipe.model.js";

const recipeRoute = express.Router();

//Post - MongoDB - /create
recipeRoute.post("/create", async (req, res) => {
  try {
    const { idUser } = req.params;

    const newRecipe = await RecipeModel.create({ ...req.body, user: idUser });

    const userUpdated = await UserModel.findByIdAndUpdate(
      idUser,
      {
        $push: {
          recipes: newRecipe._id,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

//Post - MongoDB - /insertmany
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

//Delete - MongoDB - /delete/:id
recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { idUser } = req.params;

    //deletei a tarefa
    const deletedUser = await UserModel.findByIdAndDelete(idUser);

    //retirei o id da tarega de dentro da minha array TASKS
    await UserModel.findByIdAndUpdate(
      deletedTask.user,
      {
        $pull: {
          recipes: idUser,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

//Put - MongoDB - /edit/:id
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
