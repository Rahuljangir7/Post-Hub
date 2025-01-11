import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../assets/avatar15.jpg";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { UserContext } from "../context/useContext";
import axios from "axios";

const UserProfile = () => {
  const backendApi = import.meta.env.VITE_BACKEND_API;

  const [avatar, setAvatar] = useState(Avatar);
  const [prevAvatar, setPrevAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState("");

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who isn't logged in

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  // get user's detail
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${backendApi}api/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
      setPrevAvatar(avatar);
    };

    getUser();
  }, []);

  // Change Avatar

  const changeAvatarHandler = async (e) => {
    setIsAvatarTouched(false);

    try {
      const postData = new FormData();

      postData.set("avatar", avatar);

      const response = await axios.post(
        `${backendApi}api/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      setAvatar(response?.data.avatar);
      setPrevAvatar(response?.data?.avatar);
      setImgError("");
    } catch (error) {
      setImgError(
        error?.response?.data?.message ||
          "Failed to update avatar. Please try again."
      );
    }
  };

  const imageTypeCheck = async (image) => {
    const validExtensions = ["image/png", "image/jpg", "image/jpeg"];

    if (!validExtensions.includes(image.type)) {
      setImgError("Please select a valid image file ( jpg, jpeg, png )");
      setAvatar(prevAvatar);
      setIsAvatarTouched(false);
      return false;
    }

    setImgError("");
    await changeAvatarHandler();
    return true;
  };

  const editAPI = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      };

      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${backendApi}api/users/edit-user`,
        userData,
        config
      );
      if (response.status == 200) {
        navigate("/logout");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editAPI();
  };

  useEffect(() => {
    if (avatar.name != undefined) {
      imageTypeCheck(avatar);
    }
  }, [avatar.name]);

  return (
    <>
      <section className="profile register">
        <div className="container profile_container">
          <Link to={`/myposts/${currentUser.id}`} className="btn">
            My posts
          </Link>

          <div className="profile_details">
            <div className="avatar_wrapper">
              <div className="profile_avatar">
                {avatar ? (
                  <img src={`${backendApi}uploads/${avatar}`} alt="" />
                ) : (
                  <IoMdPerson />
                )}
              </div>
              {/* Form to update avatar */}

              <form
                className="avatar_form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  accept=".png, .jpg, .jpeg"
                />

                <label
                  htmlFor="avatar"
                  onClick={() => setIsAvatarTouched(true)}
                >
                  <FaEdit />
                </label>
              </form>
              {isAvatarTouched && (
                <button className="profile_avatar-btn">
                  <FaCheck />
                </button>
              )}
            </div>
            {imgError && <p className="error_style">{imgError}</p>}
            <h1 style={{ textTransform: "capitalize" }}>{currentUser?.name}</h1>
            {/* Form to update user details */}

            <form
              action=""
              className="form profile_form register_form"
              onSubmit={handleSubmit}
            >
              {error && <p className="form_error-message">{error}</p>}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              <button type="submit" className="btn primary">
                Update details
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
