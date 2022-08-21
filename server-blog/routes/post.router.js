import { Router } from "express";
import Post from "../models/Post.js";
import { auth } from "../lib/auth.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import Comment from "../models/Comment.js";

const postRouter = Router();

// all Posts
postRouter.get("/", async (req, res, next) => {
  const allPosts = await Post.find();
  res.json(allPosts);
});

// get single Post
// postRouter.get("/:id", auth, async (req, res, next) => {
//   try {
//     const singlePost = await Post.findById(req.params.id);
//     res.json(singlePost);
//   } catch (err) {
//     next(err);
//   }
// });

// get single Post + all realted comments
postRouter.get("/:id", auth, async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("author");
  const comments = await Comment.find({ post: req.params.id }).populate(
    "author"
  );
  res.json({
    ...post.toObject(),
    comments,
  });
});

// get all comments of one post
postRouter.get("/:id/comments", auth, async (req, res, next) => {
  res.json(postComments);
});

// create Post  withoutb - AUTH
postRouter.post("/", auth, async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (err) {
    next(err);
  }
});

// create Post  with - AUTH
postRouter.post("/", auth, async (req, res, next) => {
  const post = await Post.create(req.body);
  res.json(post);
  if (!post.image) return;
  const resCloudinary = await cloudinary.uploader.upload(post.image);
  console.log(resCloudinary);
  const avatarUrlCloudinary = resCloudinary.secure_url;
  const postUpdated = await Post.findByIdAndUpdate(
    post.id,
    { image: avatarUrlCloudinary },
    { new: true }
  );
  console.log(postUpdated);
});

// Update Post
// ROUTE: /post/:id
postRouter.patch("/:id", auth, async (req, res, next) => {
  const postUpdateData = req.body;
  const postId = req.params.id;

  // update post in database
  try {
    const postUpdated = await Post.findByIdAndUpdate(postId, postUpdateData, {
      new: true,
    });
    res.json(postUpdated);
  } catch (err) {
    next(err);
  }
});

// delete post
postRouter.delete("/:id", auth, async (req, res, next) => {
  // findByIdAndUpdate can crash server
  // so catch it and prevent crash => just forward to error handler
  try {
    const postDelete = await Post.findByIdAndDelete(req.params.id);
    res.json(postDelete);
  } catch (err) {
    next(err);
  }
});

export default postRouter;
