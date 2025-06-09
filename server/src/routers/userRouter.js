const express = require("express");
const {
  regUser,
  getData,
  deleteData,
  getDataId,
  updateDetails,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", regUser);
userRouter.post("/updateDetails/:id", updateDetails);
userRouter.get("/getData", getData);
userRouter.get("/getData/:id", getDataId);
userRouter.delete("/:id", deleteData);

module.exports = userRouter;
