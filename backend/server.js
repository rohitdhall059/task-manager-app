const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const routes = require("./routes");
const Task = require("./models/Task");

dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Adds security headers
app.use(cors());
app.use(express.json());

// Global Async Error Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom Route: Delete Completed Tasks
app.delete("/api/tasks/completed", asyncHandler(async (req, res) => {
    await Task.deleteMany({ completed: true });
    res.status(200).json({ message: "Completed tasks deleted" });
}));

// API Routes
app.use("/api", routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ error: "An unexpected error occurred." });
});

// Database Connection
if (!process.env.MONGO_URI) {
  console.warn("MONGO_URI not defined in environment variables.");
}
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Graceful Shutdown
process.on("SIGINT", () => {
  console.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("MongoDb connection closed.");
      process.exit(0);
    });
  });
});