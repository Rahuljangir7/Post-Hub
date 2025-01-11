import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/loader";
import { IoMdPerson } from "react-icons/io";

const Author = () => {
  const backendApi = import.meta.env.VITE_BACKEND_API;

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${backendApi}api/users`);

        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    getAuthors();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors_container">
          {authors.map(({ _id: id, avatar, name, posts }) => {
            return (
              <>
                <Link key={id} to={`/posts/users/${id}`} className="author">
                  <div className="author_avatar">
                    {avatar ? (
                      <img
                        src={`${backendApi}uploads/${avatar}`}
                        alt={`Image of ${name}`}
                      />
                    ) : (
                      <IoMdPerson />
                    )}
                  </div>
                  <div className="author_info">
                    <h4>{name}</h4>
                    <p>{posts}</p>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No users/authors found</h2>
      )}
    </section>
  );
};

export default Author;
