const { User, Post, Friend } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { _id }) => {
      try {
        const user = await User.findById(_id);
        return user;
      } catch (err) {
        throw new Error("Ain't nobody runnin round here with that ID");
      }
    },
    getPost: async (parent, { _id }) => {
      try {
        const post = await Post.findById(_id);
        return post;
      } catch (err) {
        throw new Error("Ain't no post with that ID round here");
      }
    },
    getProfilePosts: async (parent, { userId }) => {
      try {
        const currentUser = await User.findById(userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.friends.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        return userPosts.concat(...friendPosts);
      } catch (err) {
        throw new Error("Ain't no posts round here");
      }
    },
  },
  Mutation: {
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const validPass = await user.isCorrectPassword(password);
      if (!validPass) {
        throw new AuthenticationError("Double check your digits, bruv");
      }
      const token = signToken(user);
      return { token, user };
    },
    registerUser: async (parent, { username, email, password }) => {
      try {
        const hashPass = await bcrypt.hash(password, 16);
        const newUser = new User({
          username,
          email,
          password: hashPass,
        });
        const user = await newUser.save();
        return user;
      } catch (err) {
        throw new Error("Ain't no new user round here");
      }
    },
    updateUser: async (_, { id, username, email, password }) => {
      try {
        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          updatedFields.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(id, updatedFields, {
          new: true,
        });
        return user;
      } catch (err) {
        throw new Error("Failed to update user");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await User.findByIdAndDelete(id);
        return "User deleted successfully";
      } catch (err) {
        throw new Error("Failed to delete user");
      }
    },
    createPost: async (_, { userId, content }) => {
      try {
        const newPost = new Post({ userId, content });
        const post = await newPost.save();
        return post;
      } catch (err) {
        throw new Error("Failed to create post");
      }
    },
    updatePost: async (_, { id, userId, content }) => {
      try {
        const post = await Post.findById(id);
        if (post.userId.toString() !== userId)
          throw new Error("You can only update your own post");

        await post.updateOne({ content });
        return "Post updated successfully";
      } catch (err) {
        throw new Error("Failed to update post");
      }
    },
    deletePost: async (_, { id, userId }) => {
      try {
        const post = await Post.findById(id);
        if (post.userId.toString() !== userId)
          throw new Error("You can only delete your own post");

        await post.deleteOne();
        return "Post deleted successfully";
      } catch (err) {
        throw new Error("Failed to delete post");
      }
    },
    // likePost: async (_, { id, userId }) => {
    //   try {
    //     const post = await Post.findById(id);
    //     if (!post.likes.includes(userId)) {
    //       await post.updateOne({ $push: { likes: userId } });
    //       return "Post liked successfully";
    //     } else {
    //       return "You have already liked this post";
    //     }
    //   } catch (err) {
    //     throw new Error("Failed to like post");
    //   }
    // },
    // dislikePost: async (_, { id, userId }) => {
    //   try {
    //     const post = await Post.findById(id);
    //     if (post.likes.includes(userId)) {
    //       await post.updateOne({ $pull: { likes: userId } });
    //       return "Post disliked successfully";
    //     } else {
    //       return "You have not liked this post";
    //     }
    //   } catch (err) {
    //     throw new Error("Failed to dislike post");
    //   }
    // },
    followUser: async (_, { id, userId }) => {
      try {
        const user = await User.findById(id);
        const currentUser = await User.findById(userId);
        if (!user.minions.includes(userId)) {
          await user.updateOne({ $push: { minions: userId } });
          await currentUser.updateOne({ $push: { friends: id } });
          return "User has been followed";
        } else {
          return "You already follow this user";
        }
      } catch (err) {
        throw new Error("Failed to follow user");
      }
    },
    unfollowUser: async (_, { id, userId }) => {
      try {
        const user = await User.findById(id);
        const currentUser = await User.findById(userId);
        if (user.minions.includes(userId)) {
          await user.updateOne({ $pull: { minions: userId } });
          await currentUser.updateOne({ $pull: { friends: id } });
          return "User has been unfollowed";
        } else {
          return "You do not follow this user";
        }
      } catch (err) {
        throw new Error("Failed to unfollow user");
      }
    },
  },
};

module.exports = resolvers;
