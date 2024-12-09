import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo1.png";
import googleLogo from "../../assets/images/google_logogg_1.jpg"; // Thay bằng đường dẫn logo Google
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: true,
  });

  const history = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHideSiderbarAndHeader(true);
  }, [context]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUp = (e) => {
    e.preventDefault();
  
    // Kiểm tra nếu trường 'name' rỗng
    if (formData.name === "") {
      alert("Tên không được để trống!");
      return;
    }
  
    // Kiểm tra nếu email không hợp lệ
    if (formData.email === "") {
      alert("Email không được để trống!");
      return;
    }
  
    // Kiểm tra nếu số điện thoại không hợp lệ
    if (formData.phone === "") {
      alert("Số điện thoại không được để trống!");
      return;
    }
  
    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu không khớp
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
  
    // Gửi dữ liệu đến API để đăng ký
    postData("/api/user/signup", formData)
      .then((res) => {
        console.log(res);
        alert("đăng kí thành công")
        setTimeout(()=>{
          history("/login")
        },1000);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
        alert("Đã xảy ra lỗi trong quá trình đăng ký hoặc tài khoản đã tồn tại. Vui lòng thử lại.");
      });
  };
  

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked");
    // Logic đăng ký bằng Google (e.g., sử dụng Google OAuth API).
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
        <form className="signup-form" onSubmit={signUp}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="name"
              value={formData.name} // Đảm bảo rằng đúng trường
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
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword" // Sửa thành confirmPassword
              value={formData.confirmPassword} // Đảm bảo rằng đúng trường
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu của bạn"
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
