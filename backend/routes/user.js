
// routes/user.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db.js";
import zod from "zod";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET not set in .env");
  process.exit(1);
}

const schemaSignup = zod.object({
  name: zod.string().min(1),
  email: zod.string().email(),
  password: zod.string().min(8),
});

const schemaLogin = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
});

router.post("/signup", async (req, res) => {
  const parse = schemaSignup.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: "Invalid inputs", errors: parse.error.errors });

  const { name, email, password } = parse.data;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "User created successfully", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const parse = schemaLogin.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: "Invalid inputs", errors: parse.error.errors });

  const { email, password } = parse.data;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ message: "User logged in successfully", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
