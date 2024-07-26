import { Server } from "socket.io";
import cookie from "cookie";
import { verifyToken } from "../utils/tokenUtils.js"; // Adjust the path as needed
import {
  likePost,
  addComment,
  getComments,
  getLikeStatus,
} from "../controllers/postController.js";
import { searchUsers } from "../controllers/searchController.js";
import {
  getFollowStatus,
  changeFollowStatus,
  getFollowers,
  getFollowing,
} from "../controllers/followController.js";

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "192.168.1.54:5173"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    console.log("client connected");
    const token = socket.handshake.headers.cookie
      ?.split(";")
      .find((c) => c.trim().startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = await verifyToken(token);
        if (decoded && decoded.id) {
          socket.userId = decoded.id;
          socket.join(socket.userId.toString());
        } else {
          console.error("Token is invalid or does not contain a user ID");
          return socket.disconnect();
        }
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    } else {
      console.error("No token provided");
    }

    socket.on("getLikeStatus", async (data) => {
      const { token, postId } = data;
      const decoded = await verifyToken(token);
      const userId = decoded?.id;
      const likeStatus = await getLikeStatus(token, postId);
      io.to(userId.toString()).emit("likeStatus", {
        postId: postId,
        isLiked: likeStatus,
      });
    });

    socket.on("likePost", async (data) => {
      const token = data.token;
      const postId = data.postId;
      const decoded = await verifyToken(token);
      const userId = decoded?.id;
      if (token) {
        try {
          const likeDetails = await likePost(postId, userId);

          io.to(userId.toString()).emit("likeStatus", {
            postId: postId,
            isLiked: likeDetails.isLiked,
          });
          io.emit("likeDetails", {
            postId: postId,
            likes: likeDetails.likes,
          });
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      } else {
        console.log("Access token is missing");
      }
    });

    socket.on("addComment", async (data) => {
      const { token, commentText, postId } = data;
      const decoded = await verifyToken(token);
      const userId = decoded?.id || socket.userId;
      if (userId) {
        try {
          await addComment(postId, socket.userId, commentText);
          const comments = await getComments(postId);
          io.emit("commentsUpdated", comments);
        } catch (error) {
          console.error("Failed to add comment:", error);
        }
      }
    });

    socket.on("getComments", async (postId) => {
      const comments = await getComments(postId);
      io.emit("commentsUpdated", comments);
    });

    socket.on("searchUser", async (username) => {
      try {
        const users = await searchUsers(username, socket.userId);
        io.emit("searchResults", users);
      } catch (error) {
        console.error("Failed to search users:", error);
      }
    });

    socket.on("changeFollowStatus", async (searchedId) => {
      if (socket.userId) {
        try {
          const followStatus = await changeFollowStatus(
            searchedId,
            socket.userId
          );
          socket.emit("followStatus", followStatus);
        } catch (error) {
          console.error("Failed to change follow status:", error);
        }
      }
    });

    socket.on("getFollowStatus", async (searchedId) => {
      const decoded = await verifyToken(token);
      const userId = decoded?.userId || socket.userId;
      try {
        const followStatus = await getFollowStatus(searchedId, userId);
        socket.emit("followStatus", followStatus);
      } catch (error) {
        console.error("Failed to get follow status:", error);
      }
    });

    socket.on("getFollowers", async (userId) => {
      const decoded = await verifyToken(token);
      const targetUserId = decoded.id || userId;

      try {
        const followers = await getFollowers(targetUserId);
        socket.emit("followers", followers);
      } catch (error) {
        console.error("Failed to get followers:", error);
      }
    });

    socket.on("getFollowing", async (userId) => {
      const decoded = await verifyToken(token);
      const targetUserId = decoded.id || userId;
      try {
        const following = await getFollowing(targetUserId);
        socket.emit("following", following);
      } catch (error) {
        console.error("Failed to get following:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });
};

export default configureSocket;
