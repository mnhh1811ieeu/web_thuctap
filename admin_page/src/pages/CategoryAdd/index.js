import React, { useContext, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
    };
});

const CategoryAdd = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const [formFields, setFormFields] = useState({
        name: '',
        images: '[]',
        color: ''
    });
    const history = useNavigate();
    const context =useContext(MyContext);
   
    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        )
        )
    };
    
    const addImgUrl = (e) => {
        const arr = [];
        arr.push(e.target.value);
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: arr
            }
        ))
    }
    // const addImgUrl = (e) => {
    //     const newImageUrl = e.target.value; // Lấy URL của hình ảnh từ input
    //     setFormFields((prevFields) => ({
    //       ...prevFields,
    //       [e.target.name]: [...prevFields[e.target.name] || [], newImageUrl], // Thêm URL vào cuối mảng
    //     }));
    //   };

    const addCategory = (e) => {
        e.preventDefault();
        if (formFields.name !== "" && formFields.images.length !== 0 && formFields.color !== "") {
            setIsLoading(true);
            postData('/api/category/create', formFields).then(res => {
                setIsLoading(false);
                history('/category');
            });
        //    context.fetchCategory();
        } else {
            context.setAlertBox({
                open:true,
                error:true,
                msg:'Please fill all the details'
            })
            return false;
            
        }
    };
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Thêm loại sản phẩm</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            label="Category"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Thêm loại sản phẩm"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={addCategory}>
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="card p-4">
                                

                                <div className="form-group">
                                    <h6>Tên loại sản phẩm</h6>
                                    <input type="text" name="name" onChange={changeInput} />
                                </div>

                                <div className="form-group">
                                    <h6>Link ảnh</h6>
                                    <input type="text" name='images' onChange={addImgUrl} />
                                </div>

                               

                                <div className="form-group">
                                    <h6>Màu</h6>

                                    <input type="text" name='color' onChange={changeInput} />
                                </div>
                                <br />
                            </div>

                            <div className="card p-4 mt-0">
                                <div className="imagesUploadSec">
                                    <h5 className="mb-4 mt-0">Xác nhận</h5>
                                    <div className="imgUploadRow">
                                        <Button type="submit" className="btn-blue btn-lg btn-big">
                                            <MdCloudUpload /> &nbsp; {isLoading === true ? <CircularProgress color="inherit"
                                                className="ml-3 loader" /> : 'Thêm'} 
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CategoryAdd;
