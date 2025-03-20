const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // ✅ This enables createdAt and updatedAt automatically
);

// Create the model from schema
const Task = mongoose.model("Task", TaskSchema);

// Export the model to use in routes
module.exports = Task; 