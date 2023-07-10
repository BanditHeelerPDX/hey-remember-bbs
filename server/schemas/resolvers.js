const { User, Post, Friend } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().populate("posts");
    },
    getUserByUsername: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    getPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    getPostByID: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    getFriends: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Friend.find(params);
    },
    getFriendByUsername: async (parent, { friendId }) => {
      return Friend.findOne({ friendId });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (
      parent,
      { username, firstName, lastName, email, password }
    ) => {
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, { postText, postAuthor }) => {
      return Post.create({ postText, postAuthor });
    },
    addFriend: async (parent, { friendId }, context) => {
      return user.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { friends: friendId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updateFriend: async (parent, { friendId, status }, context) => {
      return Friend.findOneAndUpdate(
        { _id: friendId },
        { status: status },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeFriend: async (parent, { friendId }, context) => {
      return Friend.findOneAndDelete(
        { _id: friendId },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removePost: async (parent, { _id }, context) => {
      return Post.findOneAndDelete(
        { _id: _id },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updatePost: async (parent, { _id, postText }, context) => {
      return Post.findOneAndUpdate(
        { _id: _id },
        { postText: postText },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;

// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const Post = require("../models/Post");

// const resolvers = {
//   Query: {
//     getUser: async (_, { id }) => {
//       try {
//         const user = await User.findById(id);
//         return user;
//       } catch (err) {
//         throw new Error("Failed to fetch user");
//       }
//     },
//     getPost: async (_, { id }) => {
//       try {
//         const post = await Post.findById(id);
//         return post;
//       } catch (err) {
//         throw new Error("Failed to fetch post");
//       }
//     },
//     getTimelinePosts: async (_, { userId }) => {
//       try {
//         const currentUser = await User.findById(userId);
//         const userPosts = await Post.find({ userId: currentUser._id });
//         const friendPosts = await Promise.all(
//           currentUser.followings.map((friendId) => {
//             return Post.find({ userId: friendId });
//           })
//         );
//         return userPosts.concat(...friendPosts);
//       } catch (err) {
//         throw new Error("Failed to fetch timeline posts");
//       }
//     },
//   },
//   Mutation: {
//     registerUser: async (_, { username, email, password }) => {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//           username,
//           email,
//           password: hashedPassword,
//         });

//         const user = await newUser.save();
//         return user;
//       } catch (err) {
//         throw new Error("Failed to register user");
//       }
//     },
//     loginUser: async (_, { email, password }) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user) throw new Error("User not found");

//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) throw new Error("Invalid password");

//         return user;
//       } catch (err) {
//         throw new Error("Failed to login");
//       }
//     },
//     updateUser: async (_, { id, username, email, password }) => {
//       try {
//         const updatedFields = {};
//         if (username) updatedFields.username = username;
//         if (email) updatedFields.email = email;
//         if (password) {
//           const salt = await bcrypt.genSalt(10);
//           const hashedPassword = await bcrypt.hash(password, salt);
//           updatedFields.password = hashedPassword;
//         }

//         const user = await User.findByIdAndUpdate(id, updatedFields, {
//           new: true,
//         });
//         return user;
//       } catch (err) {
//         throw new Error("Failed to update user");
//       }
//     },
//     deleteUser: async (_, { id }) => {
//       try {
//         await User.findByIdAndDelete(id);
//         return "User deleted successfully";
//       } catch (err) {
//         throw new Error("Failed to delete user");
//       }
//     },
//     createPost: async (_, { userId, content }) => {
//       try {
//         const newPost = new Post({ userId, content });
//         const post = await newPost.save();
//         return post;
//       } catch (err) {
//         throw new Error("Failed to create post");
//       }
//     },
//     updatePost: async (_, { id, userId, content }) => {
//       try {
//         const post = await Post.findById(id);
//         if (post.userId.toString() !== userId)
//           throw new Error("You can only update your own post");

//         await post.updateOne({ content });
//         return "Post updated successfully";
//       } catch (err) {
//         throw new Error("Failed to update post");
//       }
//     },
//     deletePost: async (_, { id, userId }) => {
//       try {
//         const post = await Post.findById(id);
//         if (post.userId.toString() !== userId)
//           throw new Error("You can only delete your own post");

//         await post.deleteOne();
//         return "Post deleted successfully";
//       } catch (err) {
//         throw new Error("Failed to delete post");
//       }
//     },
//     likePost: async (_, { id, userId }) => {
//       try {
//         const post = await Post.findById(id);
//         if (!post.likes.includes(userId)) {
//           await post.updateOne({ $push: { likes: userId } });
//           return "Post liked successfully";
//         } else {
//           return "You have already liked this post";
//         }
//       } catch (err) {
//         throw new Error("Failed to like post");
//       }
//     },
//     dislikePost: async (_, { id, userId }) => {
//       try {
//         const post = await Post.findById(id);
//         if (post.likes.includes(userId)) {
//           await post.updateOne({ $pull: { likes: userId } });
//           return "Post disliked successfully";
//         } else {
//           return "You have not liked this post";
//         }
//       } catch (err) {
//         throw new Error("Failed to dislike post");
//       }
//     },
//     followUser: async (_, { id, userId }) => {
//       try {
//         const user = await User.findById(id);
//         const currentUser = await User.findById(userId);
//         if (!user.followers.includes(userId)) {
//           await user.updateOne({ $push: { followers: userId } });
//           await currentUser.updateOne({ $push: { followings: id } });
//           return "User has been followed";
//         } else {
//           return "You already follow this user";
//         }
//       } catch (err) {
//         throw new Error("Failed to follow user");
//       }
//     },
//     unfollowUser: async (_, { id, userId }) => {
//       try {
//         const user = await User.findById(id);
//         const currentUser = await User.findById(userId);
//         if (user.followers.includes(userId)) {
//           await user.updateOne({ $pull: { followers: userId } });
//           await currentUser.updateOne({ $pull: { followings: id } });
//           return "User has been unfollowed";
//         } else {
//           return "You do not follow this user";
//         }
//       } catch (err) {
//         throw new Error("Failed to unfollow user");
//       }
//     },
//   },
// };

// module.exports = resolvers;
