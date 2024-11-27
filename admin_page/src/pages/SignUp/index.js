import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo1.png";
import googleLogo from "../../assets/images/google_logogg_1.jpg"; // Thay bằng đường dẫn logo Google


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSiderbarAndHeader(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Logic gửi dữ liệu đến API
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked");
    // Logic đăng ký bằng Google (e.g., sử dụng Google OAuth API)
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h2 className="title">Create Your Account</h2>
        <button className="google-signup-button" onClick={handleGoogleSignUp}>
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          Sign Up with Google
        </button>
        <div className="divider">or</div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
