const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalSchema");

// @desc Gets All Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({
    goals,
  });
});

// @desc Creates a new Goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json({
    goal,
  });
});

// @desc Updates a Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        text: req.body.text,
      },
    },
    {
      new: true,
    }
  );
  console.log(goal);
  console.log(updatedGoal);
  res.status(200).json({
    updatedGoal,
  });
});

// @desc Deletes a Goal
// @route DELETE /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `Goal ${req.params.id} deleted successfully`,
  });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
