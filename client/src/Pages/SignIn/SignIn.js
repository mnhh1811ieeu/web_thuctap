import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../../App'; // Import context
import logo1 from "../../assets/images/logo1.png";
import gg from "../../assets/images/gg.png";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import { fetchDataFromApi, postDataUser } from '../../utils/api';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext); // Dùng context để cập nhật isLogin
 
  const [error, setError] = useState(""); // Lưu thông báo lỗi khi đăng nhập
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const signIn = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      alert("Email và mật khẩu không được để trống!");
      return;
    }
    setIsLoading(true); // Bắt đầu loading

    try {
      // Gửi yêu cầu đăng nhập
      const res = await postDataUser("/api/user/signin", formData);
      console.log("Response from API:", res); // Kiểm tra toàn bộ response trả về

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", res.token);
      const user = {
        name: res.user?.name,
        email: res.user?.email,
        userId: res.user?.id
      }
      localStorage.setItem("user", JSON.stringify(user));

      // Hiển thị thông báo thành công
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Đăng nhập thành công",
      });

      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        window.location.href = "/"
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi xử lý đăng nhập:", error);

      context.setAlertBox({
        open: true,
        error: true,
        msg: "Đăng nhập thất bại. Vui lòng thử lại.",
      });
      setIsLoading(false); // Dừng loading khi có lỗi
    }
  };
  useEffect(() => {
    context.setIsHeaderFooterShow(false);
  }, [context]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");

  }, []);





  return (
    <section className='section signInPage'>
      <div className='shape-bottom'></div>
      <div className='container'>
        <div className='box card p-3 shadow border-0'>
          <div className='text-center'>
            <img src={logo1} alt="" style={{ width: '100px' }} />
          </div>

          <form className='mt-3' onSubmit={signIn}>
            <h2 className='mb-4'>ĐĂNG NHẬP</h2>
            <div className='form-group'>
              <TextField
                id="standard-basic"
                label="Email"
                type='email'
                required
                variant="standard"
                className='w-100'
               name="email"
                onChange={onChangeInput} // Cập nhật email
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
               name="password"
                onChange={onChangeInput} 
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
