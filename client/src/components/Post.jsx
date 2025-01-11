import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { DUMMY_POST } from "../data.js";
import Loader from "./loader.jsx";
import axios from "axios";

const Post = () => {
  const backendApi = import.meta.env.VITE_BACKEND_API;

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${backendApi}api/posts`);

        // Assuming the response contains an array of posts, not just one post.
        setPosts(response?.data[0]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts_container">
          {posts.map(
            ({
              _id: id,
              title,
              thumbnail,
              description,
              creator,
              category,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                title={title}
                thumbnail={thumbnail} // Use 'thumbnail' correctly.
                description={description}
                category={category}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts</h2>
      )}
    </section>
  );
};

export default Post;
