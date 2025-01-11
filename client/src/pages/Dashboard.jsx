import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DUMMY_POST } from "../data";
import { UserContext } from "../context/useContext";
import axios from "axios";
import Loader from "../components/loader";
import DeletePost from "./DeletePost";

const Dashboard = () => {
  const backendApi = import.meta.env.VITE_BACKEND_API;

  const [posts, setPosts] = useState(DUMMY_POST);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who isn't logged in

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${backendApi}api/posts/users/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="dashboard">
        {posts.length ? (
          <div className="container dashboard_container">
            {posts.map((post) => {
              return (
                <article key={post.id} className="dashboard_post">
                  <div className="dashboard_post-info">
                    <div className="dashboard_post-thumbnail">
                      <img
                        src={`${backendApi}uploads/${post.thumbnail}`}
                        alt=""
                      />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard_post-actions">
                    <Link to={`/posts/${post._id}`} className="btn ">
                      View
                    </Link>
                    <Link
                      to={`/posts/${post._id}/edit`}
                      className="btn sm primary"
                    >
                      Edit
                    </Link>
                    <DeletePost postId={post._id} />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="center">You have no posts yet.</div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
