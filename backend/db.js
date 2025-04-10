import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://rohitbpit022:20150211411Lala@@cluster0.6cpcbu0.mongodb.net/"; // ✅ Hardcoded

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,          
    required: true,         
    trim: true              
  },
  email: {  // ❌ Fixed email type
    type: String,          
    required: true,         
    trim: true,
    unique: true  // Ensures unique emails
  },
  password: {
    type: String,          
    required: true           
  }
});

// ✅ Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Create Models
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

// ✅ Correct Export Syntax for ES Modules
export { User, Blog };
