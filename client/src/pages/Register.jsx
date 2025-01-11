import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const backendApi = import.meta.env.VITE_BACKEND_API;

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${backendApi}api/users/register`,
        userData
      );

      const newUser = await response.data;
      console.log(newUser);

      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      }

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form action="" className="form register_form" onSubmit={registerUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm password"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>

        <small>
          Already have an account? <Link to={"/login"}>sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
