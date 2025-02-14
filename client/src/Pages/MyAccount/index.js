import React, { useContext, useEffect, useState } from 'react';
import { editData,  fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BiCloudUpload } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";  // Import eye icons
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import InputAdornment from '@mui/material/InputAdornment';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MyAccount = () => {
    const [isLogin, setIsLogin] = useState(false);
    const history = useNavigate();
    const [value, setValue] = React.useState(0);
    
    //const [imgFiles, setImgFiles] = useState();
    const [passwordFields, setPasswordFields] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const context = useContext(MyContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [previews, setPreviews] = useState('https://ss-images.saostar.vn/w700/2024/5/3/pc/1714672483985/k20jz0wkdn1-6ixqpdqtdy2-8cgbaz0qe13.jpg');
    const [userData, setUserData] = useState([]);


    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        phone: '',
        images: [],
    });


    const changeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }));
    }

    const onChangeFile = async (e) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?.userId;
            const formdata = new FormData();
            const files = e.target.files;

            //setImgFiles(files); // Lưu tệp đã chọn vào state

            // Tạo URL tạm thời cho ảnh đầu tiên (hiển thị trước khi upload)
            if (files.length > 0) {
                const previewURL = URL.createObjectURL(files[0]);
                setPreviews(previewURL);
            }

            // Gửi ảnh lên server
            for (let i = 0; i < files.length; i++) {
                formdata.append(`images`, files[i]);
            }
            const response = await postData(`/api/user/${userId}`, formdata);

            console.log(formdata)
            // Giả sử API trả về URL ảnh sau khi upload
            if (response && response.data && response.data.imageUrl) {
                setPreviews(response.data.imageUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;

        const token = localStorage.getItem("token");
        if (token !== '' && token !== undefined && token !== null) {
            setIsLogin(true);
        } else {
            history("/signIn");
        }

        fetchDataFromApi(`/api/user/${userId}`).then((res) => {
            console.log(res);
            setUserData(res);
            console.log(res)
            setFormFields({
                name: res.name,
                email: res.email,
                phone: res.phone,
                
            });
            console.log(formFields);
        });

    }, []);

    const editUser = (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;

        const formdata = new FormData();
        formdata.append('name', formFields.name);
        formdata.append('email', formFields.email);
        formdata.append('phone', formFields.phone);
        formdata.append('images', formFields.images);
        console.log(formdata)

        if (formFields.name !== '' && formFields.email !== '' && formFields.phone !== '') {
            setIsLoading(true);
            editData(`/api/user/${userId}`, formFields).then((res) => {
                setIsLoading(false);
                if (context && context.fetchCategory) {
                    context.fetchCategory();
                }
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: 'Thông tin đã cập nhật thành công!'
                });
            });
        }
    }


    const changePassword = (e) => {
        e.preventDefault();
    
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;
    
        // Kiểm tra userId
        if (!userId) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Không tìm thấy người dùng!'
            });
            return;
        }
    
        // Kiểm tra xem tất cả các trường mật khẩu có được điền đầy đủ không
        if (!passwordFields.oldPassword || !passwordFields.newPassword || !passwordFields.confirmPassword) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Tất cả các trường mật khẩu đều phải được điền đầy đủ!'
            });
            return;
        }
    
        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có trùng khớp không
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Mật khẩu xác nhận không khớp!'
            });
            return;
        }
    
        // Xây dựng đối tượng dữ liệu để gửi
        const data = {
            oldPassword: passwordFields.oldPassword,
            newPassword: passwordFields.newPassword,
        };
    
        setIsLoading(true);
    
        // URL chính xác, đảm bảo không có lỗi về đường dẫn
        const url = `http://localhost:4000/api/user/change-password/${userId}`;
    
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // Chắc chắn gửi dưới dạng JSON
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)  // Gửi dưới dạng JSON
        })
        .then((res) => res.json())
        .then((data) => {
            setIsLoading(false);
            if (data.message) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: data.message || 'Mật khẩu đã được cập nhật thành công!'
                });
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: 'Cập nhật mật khẩu không thành công!'
                });
            }
        })
        .catch((error) => {
            setIsLoading(false);
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Đã xảy ra lỗi trong quá trình cập nhật mật khẩu!'
            });
        });
    };
    

    const handlePasswordChange = (e) => {
        setPasswordFields({
            ...passwordFields,
            [e.target.name]: e.target.value
        });
    };

    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <section className='section myAccountPage'>
            <div className='container'>
                <h2>My Account</h2>
                <Box sx={{ width: '100%' }} className="myAccBox card shadow">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Chỉnh sửa thông tin" {...a11yProps(0)} />
                            <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <form onSubmit={editUser}>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='userImage'>
                                        <img src={previews} alt="User Avatar" />
                                        
                                        <div className='overlay d-flex justify-content-center align-items-center'>
                                            <BiCloudUpload />
                                            <input type="file" multiple onChange={(e) => onChangeFile(e)} name='images' />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-8'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <TextField label="User Name" variant="outlined" className='w-100' name="name" value={formFields.name} onChange={changeInput} />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <TextField label="Email" disabled variant="outlined" className='w-100' value={formFields.email} name="email" onChange={changeInput} />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <TextField label="Phone Number" variant="outlined" className='w-100' value={formFields.phone} name="phone" onChange={changeInput} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <Button type="submit" className='btn-blue btn-red btn-lg btn-big'>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <form onSubmit={changePassword}>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <TextField 
                                                label="Old Password" 
                                                type={"text"} // Toggle type based on state
                                                variant="outlined" 
                                                className='w-100' 
                                                name="oldPassword"
                                                value={passwordFields.oldPassword}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <TextField 
                                                label="New Password" 
                                                type={showNewPassword ? "text" : "password"} // Toggle type based on state
                                                variant="outlined" 
                                                className='w-100 showEye' 
                                                name="newPassword"
                                                value={passwordFields.newPassword}
                                                onChange={handlePasswordChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <button type="button" onClick={toggleNewPasswordVisibility} style={{ border: 'none', background: 'transparent' }}>
                                                                {showNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                                                
                                                            </button>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <TextField 
                                                label="Confirm Password" 
                                                type={showConfirmPassword ? "text" : "password"} // Toggle type based on state
                                                variant="outlined" 
                                                className='w-100 showEye' 
                                                name="confirmPassword"
                                                value={passwordFields.confirmPassword}
                                                onChange={handlePasswordChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <button type="button" onClick={toggleConfirmPasswordVisibility} style={{ border: 'none', background: 'transparent' }}>
                                                                {showConfirmPassword ?  <AiFillEye /> : <AiFillEyeInvisible />}
                                                            </button>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='form-group'>
                                <Button type="submit" className='btn-blue btn-red btn-lg btn-big'>
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </CustomTabPanel>

                </Box>
            </div>
        </section>
    );
}

export default MyAccount;