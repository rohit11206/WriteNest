import express from "express";
import jwt from "jsonwebtoken";
import { Blog } from "../db.js"; // Import Blog model
 // Middleware for authentication
import zod from "zod";
import authenticate from "../middleware/auth.js"; // ✅ Remove curly braces


const blogRouter = express.Router();

// Blog Schema Validation using Zod
const blogSchema = zod.object({
  title: zod.string().min(5),
  content: zod.string().min(20),
});

blogRouter.post("/create", authenticate, async (req, res) => {
    const { success } = blogSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Invalid blog input" });
    }
  
    try {
      const { title, content } = req.body;
      const blog = await Blog.create({ title, content, author: req.userId });
      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
      res.status(500).json({ message: "Error creating blog", error });
    }
  });
  // Get all blogs
  blogRouter.get('/',async(req,res)=>{
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
      }
    });
    // Get a specific blog by ID
blogRouter.get("/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate("author", "name email");
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog", error });
    }
  });
  
    blogRouter.put("/:id", authenticate, async (req, res) => {
        try {
          const blog = await Blog.findById(req.params.id);
          if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
          }
          if (blog.author.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized" });
          }
          blog.title = req.body.title || blog.title;
          blog.content = req.body.content || blog.content;
          await blog.save();
          res.status(200).json({ message: "Blog updated successfully", blog });
        } catch (error) {
          res.status(500).json({ message: "Error updating blog", error });
        }
      });
      
      // Delete a blog (Protected Route, Only Author)
      blogRouter.delete("/:id", authenticate, async (req, res) => {
        try {
          const blog = await Blog.findById(req.params.id);
          if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
          }
          if (blog.author.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized" });
          }
          await blog.deleteOne();
          res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: "Error deleting blog", error });
        }
      });
      export default blogRouter;
