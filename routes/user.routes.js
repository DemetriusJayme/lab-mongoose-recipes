import express from "express";
import UserModel from "../models/user.models.js";

const userRoute = express.Router();

//Post - MongoDB - /create
userRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Get - MongoDB - /read/:userID
userRoute.get("/read/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId).populate("recipes");

    console.log("entrei");
    console.log(userId);

    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//Put - MongoDB - /update/:userId
userRoute.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//Delete - MongoDB - /delete/:userId
userRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ msg: "Usuário não encontrado!" });
    }

    const users = await UserModel.find();

    //Deleta TODAS as receitas onde o usuário esta relacionado
    await UserModel.deleteMany({ user: userId });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default userRoute;
