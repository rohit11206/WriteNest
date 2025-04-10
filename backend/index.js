import express from "express";
import cors from "cors";
import user from "./routes/user.js"; // Add `.js` extension
import blog from "./routes/blog.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/user/',user)
app.use('/api/v1/blog/',blog)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
