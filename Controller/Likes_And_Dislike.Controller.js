const Comment = require("../Models/CommentSchema");
const User = require("../Models/userSchema");
const mongoose = require("mongoose");


const CreateLike = async (req, res) => {
  const { commentId, userId } = req.params;
  //console.log(commentId, " ", userId);

  //Note: fineOne and findById both work same.
  const CommentExist = await Comment.findById({ _id: commentId });
  const UserExist = await User.findOne({ _id: userId });

  if (!CommentExist) {
    return res.status(400).json({ error: "Comment not found" });
  }

  if (!UserExist) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    // Check the userId exists inside the likedBy(array) collection or not
    if (CommentExist.likedBy.includes(userId)) {
      return res.status(400).json({ error: "User already like this comment" });
    }

    // Check the userId exists inside the dislikedBy(array) collection or not
    if (CommentExist.dislikedBy.includes(userId)) {
      CommentExist.dislikedBy.pull(userId); // Remove the userId from the dislikedBy array
      CommentExist.dislikes -= 1;
    }

    CommentExist.likedBy.push(userId); // Add the userId from the likedBy array
    CommentExist.likes += 1;

    await CommentExist.save();

    res
      .status(200)
      .json({ message: "Like created successfully", data: CommentExist });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const CreateDislike = async (req, res) => {
  const { commentId, userId } = req.params;
 // console.log(commentId, " ", userId);

  //Note: fineOne and findById both work same.
  const CommentExist = await Comment.findOne({ _id: commentId });
  const UserExist = await User.findById({ _id: userId });

  if (!CommentExist) {
    return res.status(400).json({ error: "Comment not found" });
  }

  if (!UserExist) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    // Check the userId exists inside the dislikedBy(array) collection or not
    if (CommentExist.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User already dislike this comment" });
    }

    // Check the userId exists inside the likedBy(array) collection or not
    if (CommentExist.likedBy.includes(userId)) {
      CommentExist.likedBy.pull(userId); // Remove the userId from the likedBy array
      CommentExist.likes -= 1;
    }

    CommentExist.dislikedBy.push(userId); // Add the userId from the likedBy array
    CommentExist.dislikes += 1;

    await CommentExist.save();
    res
      .status(200)
      .json({ message: "Like created successfully", data: CommentExist });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
 

module.exports = {
  CreateLike,
  CreateDislike,
};
