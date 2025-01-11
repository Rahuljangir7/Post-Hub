import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdPerson } from "react-icons/io";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
const PostAuther = ({ authorID, createdAt }) => {
  const backendApi = import.meta.env.VITE_BACKEND_API;

  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${backendApi}api/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);
  return (
    <>
      <Link to={`/posts/users/${authorID}`} className="post_author">
        <div className="post_author-avatar">
          {author?.avatar ? (
            <img src={`${backendApi}uploads/${author?.avatar}`} alt="" />
          ) : (
            <IoMdPerson />
          )}
        </div>
        <div className="post_author-details">
          <h5>By: {author?.name}</h5>
          <small>
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </small>
        </div>
      </Link>
    </>
  );
};

export default PostAuther;
