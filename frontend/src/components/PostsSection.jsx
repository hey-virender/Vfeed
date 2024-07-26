import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";


const PostsSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/api/posts/all");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-y-scroll pb-36 hide-scrollbar">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostsSection;
