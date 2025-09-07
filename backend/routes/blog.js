
import express from "express";
import zod from "zod";
import authenticate from "../middleware/auth.js";
import { Blog } from "../db.js";

const router = express.Router();

const blogSchema = zod.object({
  title: zod.string().min(5),
  content: zod.string().min(20),
});

// create
router.post("/create", authenticate, async (req, res) => {
  const parse = blogSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: "Invalid blog input", errors: parse.error.errors });

  try {
    const { title, content } = parse.data;
    const blog = await Blog.create({ title, content, author: req.userId });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
});

// list
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email").sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
});

// get by id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
});

// update
router.put("/:id", authenticate, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.userId) return res.status(403).json({ message: "Not authorized" });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
});

// delete
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.userId) return res.status(403).json({ message: "Not authorized" });

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
});

export default router;

