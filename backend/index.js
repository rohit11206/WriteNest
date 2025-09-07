// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
