import { Router } from "express";
import { auth } from "../lib/auth.middleware.js";
import Post from "../models/Post.js";

const postsRouter = Router();

// all Posts
postsRouter.get("/", auth, async (req, res, next) => {
  const allPosts = await Post.find();
  res.json(allPosts);
});

// single Post
postsRouter.get("/:id", auth, async (req, res, next) => {
  try{
    const singlePost = await Post.findById(req.params.id);
    res.json(singlePost);
  } catch (err) {
    next(err);
  }
});

// create Post
postsRouter.post("/", async (req, res, next) => {
try {
  const newPost= await Post.create(req.body) 
  res.json(newPost);
} catch (err) {
  next(err);
}
});

export default postsRouter;
