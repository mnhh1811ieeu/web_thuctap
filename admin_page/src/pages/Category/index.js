import React, { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
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

const Category = () => {
    const context = useContext(MyContext);
    const [catData, setCatData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editFields, setEditFields] = useState({});
    const [editId, setEditId] = useState(null);
    const [page, setPage] = useState(1);
    const [formFields, setFormFields] = useState({

        name: '',
        images: '[]',
        color: ''
    });
    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi('/api/category/').then((res) => {
            setCatData(res);
            console.log(res);
            context.setProgress(100);
        })
    }, []);
    const handleClose = () => {
        setOpen(false);
    };
    const editCategory = (id) => {
        setFormFields({
            name: '',
            images: '',
            color: '',
        });
        setOpen(true);

        setEditId(id);
        fetchDataFromApi(`/api/category/${id}`).then((res) => {
            setFormFields({
                name: res.name,
                images: res.images,
                color: res.color,
            });
            console.log(res);
        })
    };
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
    };
    const categoryEditFun = (e) => {

        e.preventDefault();
        setIsLoading(true);
        context.setProgress(40);
        editData(`/api/category/${editId}`, formFields).then((res) => {
            fetchDataFromApi('/api/category').then((res) => {
                setCatData(res);
                setOpen(false);
                setIsLoading(false);
            });
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Cập nhật thành công"
            });
            context.setProgress(100);
        })
    }
    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then(res => {
            fetchDataFromApi('/api/category').then((res) => {
                setCatData(res);


            })
        })
    };
    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/category?page=${value}`).then((res) => {
            setCatData(res);
            context.setProgress(100);
        })
    };
    return <div>
        <>

            <div className="right-content w-100">
                <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0 '> DANH SÁCH DANH MỤC</h5>
                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                                components="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />} />
                            <StyledBreadcrumb
                                components="a"
                                label="Category"
                                href="#"

                            />

                        </Breadcrumbs>
                        <Link to='/category/add'><Button className='btn-blue ml-3 pl-3 pr-3'>
                            Thêm danh mục</Button></Link>
                    </div>
                </div>
                <div className='card shadow border-0 p-3 mt-4'>



                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>UID</th>
                                    <th style={{ width: '100px' }}>Image</th>
                                    <th >Category</th>

                                    <th>Color</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    catData?.categoryList?.length !== 0 && catData?.categoryList?.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div className='d-flex align-items-center'>

                                                        <span>#{index + 1}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex productBox">
                                                        <div className="imgWrapper">
                                                            <div className="img">
                                                                <img className="w-100" src={item.images[0]}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.color}</td>

                                                <td>
                                                    <div className="actions d-flex align-items-center">

                                                        <Button className="success" color="success" onClick={() => editCategory(item.id)}><FaPen /></Button>
                                                        <Button className="error" color="error"
                                                            onClick={() => deleteCat(item.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>
                        {
                            catData?.totalPages > 1 && <div className="d-flex tableFooter">

                                <Pagination className="pagination" count={catData?.totalPages}
                                    showFirstButton showLastButton color="primary" onChange={handleChange} />

                            </div>
                        }

                    </div>
                </div>
            </div>
            <Dialog
                className='editModal'
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                <form >
                    <DialogContent>

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Tên danh mục"
                            type="text"
                            fullWidth
                            value={formFields.name}
                            onChange={changeInput}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="images"
                            name="images"
                            label="Ảnh"
                            type="text"
                            fullWidth
                            value={formFields.images}
                            onChange={addImgUrl}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="color"
                            name="color"
                            label="Màu"
                            type="text"
                            fullWidth
                            value={formFields.color}
                            onChange={changeInput}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined"> Cancel</Button>
                        <Button type="button" onClick={categoryEditFun}
                            variant="contained" className="btn-blue ">
                            {isLoading === true ? <CircularProgress color="inherit"
                                className="ml-3 loader" /> : 'Chỉnh sửa'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    </div>;
};

export default Category;
