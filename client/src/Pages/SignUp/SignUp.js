import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App';
import logo1 from "../../assets/images/logo1.png"
import gg from "../../assets/images/gg.png"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { postData } from '../../utils/api';
const SignUp = () => {
  const history = useNavigate();
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    context.setIsHeaderFooterShow(false);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false,
  });
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
  
    // Gửi dữ liệu đến API để đăng ký
    postData("/api/user/signup", formData)
      .then((res) => {
        console.log(res);
        alert("đăng kí thành công")
        setTimeout(()=>{
          history("/signIn")
        },1000);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
        alert("Đã xảy ra lỗi trong quá trình đăng ký hoặc tài khoản đã tồn tại. Vui lòng thử lại.");
      });
  };
  return (
    <section className='section signInPage signUpPage'>
      <div className='shape-bottom'>

      </div>
      <div className='container'>
        <div className='box card p-3 shadow border-0'>
          <div className='text-center' >
            <img src={logo1} alt="" style={{ width: '100px' }} />
          </div>



          <form className='mt-3' onSubmit={signUp}>
            <h2 className='mb-3'>ĐĂNG KÝ</h2>

            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <TextField id="standard-basic" label="Họ tên" type='text' required variant="standard" className='w-100' name="name" onChange={handleChange}/>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <TextField id="standard-basic" label="Số điện thoại" type='text' required variant="standard" className='w-100' name="phone" onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className='form-group'>
              <TextField id="standard-basic" label="email" type='email' required variant="standard" className='w-100' name="email" onChange={handleChange} />
            </div>
            <div className='form-group'>
              <TextField id="standard-basic" label="Mật khẩu" type='password' required variant="standard" className='w-100' name="password" onChange={handleChange} />
            </div>


            <a className='border-effect cursor txt' >Quên mật khẩu?</a>

            <div className='d-flex align-items-center mt-3 mb-3'>
              <div className='row w-100'>
                <div className='col-md-7'>
                  <Button type="submit" className="btn-blue btn-lg  btn-big w-100">Đăng kí</Button>
                </div>
                <div className='col-md-5 pr-0'>
                  <Link to="/">
                    <Button className="btn-lg btn-big w-100"
                      variant="outlined"
                      onClick={() => context.setIsHeaderFooterShow(true)}
                    >
                      Hủy bỏ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className='txt'>Đã có tài Khoản? <Link to="/signIn" className="border-effect">Đăng nhập</Link></p>

            <h6 className='mt-4 text-center font-weight-bold '>Hoặc tiếp tục bằng</h6>

            <Button className='loginWithGoogle mt-2' variant='outlined'><img src={gg} alt="" /> Sign In With Google</Button>

          </form>


        </div>
      </div>
    </section>
  )
}

export default SignUp