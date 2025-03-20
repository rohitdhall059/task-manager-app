const express = require("express");
const Task = require("./models/Task");
const router = express.Router();

// Utility: Async Handler Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create Task
router.post("/tasks", asyncHandler(async (req, res) => {
  // TODO: Add validation middleware if needed
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
}));

// Get All Tasks
router.get("/tasks", asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
}));

// Update Task
router.put("/tasks/:id", asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
}));

// Delete Task
router.delete("/tasks/:id", asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({ message: "Task deleted" });
}));

module.exports = router;