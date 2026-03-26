import express, { application } from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

//create a post  POST /api/posts/

router.post("/", async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    //turn the author field from an id into a user document (that includes the username)
    await post.populate("author", 'username');
    res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//get all posts   GET  /api/post/

router.get("/", async (req, res) => {
  try {
    //can filter post based off the logged in user
    const posts = await Post.find({ author: req.user._id })
                            .sort({ createdAt: -1 })
                            //turn the author (which is an id) into the user document for that author/id
                            //the second argument is the username is the field in the user document we want to keep
                            .populate("author", 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

export default router;
