import Logo from '../../assets/images/logo1.png';
import { useEffect, useState, useContext } from 'react';
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import {  postDataUser } from '../../utils/api';

const Login = () => {
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isAdmin :true
    });

    const context = useContext(MyContext);  // Lấy context

    useEffect(() => {
        // Đảm bảo ẩn header và sidebar khi vào trang đăng nhập
        context.setisHideSiderbarAndHeader(true);

        // Cleanup function để khôi phục khi rời trang đăng nhập
        return () => {
            context.setisHideSiderbarAndHeader(false); // Khôi phục lại trạng thái khi rời trang đăng nhập
        };
    }, [context]);

    // Đổi giá trị formData khi người dùng nhập dữ liệu
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
           const user={
            name: res.user?.name,
            email: res.user?.email,
            userId: res.user?.id
           }
            localStorage.setItem("user",JSON.stringify(user));
    
            // Hiển thị thông báo thành công
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Đăng nhập thành công",
            });
    
            // Chuyển hướng sau 2 giây
            setTimeout(() => {
              window.location.href="/"
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
    


    return (
        <section className="loginSection">
            <div className="loginBox">
                <div className="logo text-center">
                    <img src={Logo} alt="Logo" />
                    <h5>Login to BHM</h5>
                </div>

                <div className="wrapper mt-3 card border p-4">
                    <form onSubmit={signIn}>
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><MdEmail /></span>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={onChangeInput}
                                required
                            />
                        </div>

                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><RiLockPasswordFill /></span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={onChangeInput}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Button type="submit" className="btn-blue btn-lg-w-1">
                                Sign In
                            </Button>
                        </div>

                        <div className="form-group">
                            <Link to="/forgot-password" className="link">
                                Forgot Password
                            </Link>
                            <Link to="/signup" className="link">
                                Chưa có tài khoản?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
