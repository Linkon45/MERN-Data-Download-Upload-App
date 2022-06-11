const asyncHandler = require("express-async-handler");

// @desc Gets All Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Goals retrieved successfully",
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
  res.status(200).json({
    message: "Goals added successfully",
  });
});

// @desc Updates a Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Goal ${req.params.id} updated successfully`,
  });
});

// @desc Deletes a Goal
// @route DELETE /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
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
