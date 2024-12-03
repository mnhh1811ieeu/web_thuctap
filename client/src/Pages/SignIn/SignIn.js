import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../../App'; // Import context
import logo1 from "../../assets/images/logo1.png";
import gg from "../../assets/images/gg.png";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import { fetchDataFromApi } from '../../utils/api';

const SignIn = () => {
  const { isLogin, setIsLogin } = useContext(MyContext);
  const context = useContext(MyContext); // Dùng context để cập nhật isLogin
  const [email, setEmail] = useState(""); // Lưu email
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const [error, setError] = useState(""); // Lưu thông báo lỗi khi đăng nhập
// Giả sử sau khi người dùng đăng nhập thành công, bạn lưu trạng thái vào localStorage
const handleLoginSuccess = (userData) => {
  localStorage.setItem("authToken", userData.token); // Lưu token hoặc thông tin đăng nhập khác
  setIsLogin(true);  // Cập nhật trạng thái trong context
};

  useEffect(() => {
    context.setIsHeaderFooterShow(false);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLogin(true); // Cập nhật trạng thái đăng nhập
    }
  }, [setIsLogin]);

  useEffect(() => {
    if (isLogin) {
      fetchDataFromApi("/api/auth")
        .then((data) => {
          console.log("Thông tin người dùng:", data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
        });
    }
  }, [isLogin]);
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngừng reload trang khi submit
  
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log("Đăng nhập thành công:", response.data);
  
      // Lưu token vào localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isLogin", JSON.stringify(true));  // Lưu trạng thái login
  
      // Cập nhật trạng thái isLogin trong context
      context.setIsLogin(true);
      
      alert("Đăng nhập thành công!");
      // Dùng history.push() để chuyển hướng mà không reload trang
      window.location.replace("/"); // Dùng replace để không lưu trang đăng nhập trong lịch sử
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };
  

  return (
    <section className='section signInPage'>
      <div className='shape-bottom'></div>
      <div className='container'>
        <div className='box card p-3 shadow border-0'>
          <div className='text-center'>
            <img src={logo1} alt="" style={{ width: '100px' }} />
          </div>

          <form className='mt-3' onSubmit={handleLogin}>
            <h2 className='mb-4'>ĐĂNG NHẬP</h2>
            <div className='form-group'>
              <TextField
                id="standard-basic"
                label="Email"
                type='email'
                required
                variant="standard"
                className='w-100'
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Cập nhật email
              />
            </div>
            <div className='form-group'>
              <TextField
                id="standard-basic"
                label="Mật khẩu"
                type='password'
                required
                variant="standard"
                className='w-100'
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Cập nhật mật khẩu
              />
            </div>

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <p className="text-danger">{error}</p>}

            <a className='border-effect cursor txt'>Quên mật khẩu?</a>

            <div className='d-flex align-items-center mt-3 mb-3'>
              <Button type="submit" className="btn-blue btn-lg btn-big col-8">Đăng nhập</Button>
              <Link to="/">
                <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={() => context.setIsHeaderFooterShow(true)}>
                  Hủy bỏ
                </Button>
              </Link>
            </div>

            <p className='txt'>
              Chưa có tài khoản? <Link to="/signUp" className="border-effect">Đăng kí</Link>
            </p>

            <h6 className='mt-4 text-center font-weight-bold'>Hoặc tiếp tục bằng</h6>
            <Button className='loginWithGoogle mt-2' variant='outlined'>
              <img src={gg} alt="" /> Sign In With Google
            </Button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
