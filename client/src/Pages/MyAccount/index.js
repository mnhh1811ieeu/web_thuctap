import React, { useContext, useEffect, useState } from 'react'
import { editData, fetchDataFromApi, postDataProduct } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BiCloudUpload } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MyContext } from '../../App';


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
    const [files, setFiles] = useState([]);
    const [imgFiles, setimgFiles] = useState();
    const context = useContext(MyContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [userData, setUserData] = useState([]);

    const formdata = new FormData();

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        phone: '',
        images: [],
    });

    let {id} =useParams();

    const changeInput = (e) => {
        setFormFields( () => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
            setimgFiles(e.target.files);
            for (var i = 0; i < files.length; i++) {
                const file = files[i];
                imgArr.push(file);
                formdata.append(`images`, file);
            }
            setFiles(imgArr);
            // sửa chỗ này
            postDataProduct(apiEndPoint, formdata).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error)
        }
    }
     
    useEffect(() => {
        if (!imgFiles) return;
        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }
        const objectUrls = tmp;
        setPreviews(objectUrls);
        //free memory
        for (let i = 0; i < objectUrls.length; i++) {
            return () => {
                URL.revokeObjectURL(objectUrls[i])
            }
        }
    }, [imgFiles])

    useEffect( () => {
        window.scrollTo(0,0);

        const token = localStorage.getItem("token");
        if(token !== '' && token !== undefined && token !== null){
            setIsLogin(true);
        }
        else{
            history("/signIn")
        }

        fetchDataFromApi(`/api/user/${id}`).then( (res) => {
            setUserData(res)
            setPreviews(res.images)
            setFormFields({
                name: res.name,
                email: res.email,
                phone: res.phone,
            });
        })


    }, [])

    const editUser = (e) => {
        e.preventDefault();

        formdata.append('name', formFields.name);
        formdata.append('email', formFields.email);
        formdata.append('phone', formFields.phone);
        formdata.append('images', formFields.images);
        
        if (formFields.name !== '' && formFields.email !== '' && formFields.phone !== '') {
            setIsLoading(true);
            editData(`/api/user/${id}`, formFields).then((res) => {                
                
                setIsLoading(false);
                MyContext.fetchCategory();
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: 'user updated'
                })
        });
        };
    }

return (
    <section className='section myAccountPage'>
        <div className='container'>
            <h2 className=''>My Account</h2>
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
                                    <img src="https://ss-images.saostar.vn/w700/2024/5/3/pc/1714672483985/k20jz0wkdn1-6ixqpdqtdy2-8cgbaz0qe13.jpg" alt="image" />
                                    <div className='overlay d-flex justify-content-center align-items-center'>
                                        <BiCloudUpload />
                                        <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/user/upload')} name='images'/>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <TextField  label="User Name" variant="outlined" className='w-100' name="name" onChange={changeInput} />

                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <TextField  label="Email" disabled variant="outlined" className='w-100' name="email" onChange={changeInput}/>

                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <TextField  label="Phone Number" variant="outlined" className='w-100' name="phone" onChange={changeInput}/>

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
                <form>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <TextField label="Old Password" type="password" variant="outlined" className='w-100' />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <TextField label="New Password" type="password" variant="outlined" className='w-100' />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <TextField label="Confirm Password" type="password" variant="outlined" className='w-100' />
                                </div>
                            </div>
                            
                        </div>


                        <div className='form-group'>
                            <Button className='btn-blue btn-red btn-lg btn-big'>
                                Save
                            </Button>

                        </div>
                    </div>
                </form>
                </CustomTabPanel>
            </Box>
        </div>
    </section>
  )
}

export default MyAccount