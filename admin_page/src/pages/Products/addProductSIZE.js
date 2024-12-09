
import React, { useState, useEffect, useContext } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
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

const AddProductSIZE = () => {
    
    const [editId, setEditId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ productSizeData, setProductSizeData] = useState([]);
    const context = useContext(MyContext);

    const [formFields, setFormFields] = useState({

        productSIZE: '',
        
    })

    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    useEffect( ( ) =>{
        fetchDataFromApi( "/api/productSIZE").then( (res) => {
            setProductSizeData(res);
        })
    }, [])

    const addProductSize = (e) => {
        e.preventDefault();

        
        const formdata = new FormData();
        formdata.append('productSIZE', formFields.productSIZE);

        if (formFields.productSIZE === "") {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền size",
                error: true
            });

            return false;
        };
        
        setIsLoading(true);

        if( editId === '' ){
            postData('/api/productSIZE/create', formFields).then( (res) => {
                context.setAlertBox({
                    open: true,
                    msg: 'Đã tạo sản phẩm thành công',
                    error: false
                });
                setIsLoading(false);
                setFormFields( {
                    productSIZE: ''
                })
        
                fetchDataFromApi( "/api/productSIZE").then( (res) => {
                    setProductSizeData(res);
                })
                // history('/product/list');
            })
        }else{
            editData(`/api/productSIZE/${editId}`, formFields).then( (res) => {
                fetchDataFromApi( "/api/productSIZE").then( (res) => {
                    setProductSizeData(res);
                    setEditId('');
                })
            });
            setIsLoading(false);
            setFormFields({
                productSIZE: ''
            })
            
        }
 
    }

    const deleteItem = (id) => {
        deleteData(`/api/productSIZE/${id}`).then( (res) => {
            fetchDataFromApi( "/api/productSIZE").then( (res) => {
                setProductSizeData(res);
            })
        })
    }
    const updateData = (id) => {
        fetchDataFromApi( `/api/productSIZE/${id}`).then( (res) => {
            setEditId(id);
            setFormFields( {
                productSIZE: res.productSIZE,
            })
        })
    }
    return (
        <>
            <div className='right-content w-100'>
                <div className='card shadow border-0 w-100 flex-row p-4 mt-2'>
                    <h5 className='mb-0 '> Thêm size sản phẩm </h5>
                    <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                        <StyledBreadcrumb
                            components="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />} 
                        />
                        <StyledBreadcrumb
                            components="a"
                            label="Product SIZE"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Add Product SIZE"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={addProductSize}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card p-4'>
                                <div className='row'>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>Size sản phẩm</h6>

                                            <input type='text ' name="productSIZE" value={formFields.productSIZE} onChange={
                                                inputChange}/>
                                        </div>
                                    </div>

                                </div>

                                <Button type='submit' className='btn-blue btn-lg btn-big ' style={{ width: '150px'}} >
                                    <MdCloudUpload /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Thêm'}
                                </Button>

                            </div>

                        </div>
                    </div>

                </form>


                {
                    productSizeData.length !== 0 &&
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='card p-4 mt-3'>
                                <div className="table-responsive mt-3">
                                        <table className="table table-bordered v-align">
                                            <thead className="thead-dark">
                                                <tr>
                                                
                                                    <th>Product SIze</th>

                                                    <th width="25%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                productSizeData?.map( (item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {item.productSIZE}
                                                            </td>
                                                            <td>
                                                                <div className="actions d-flex align-items-center">
                                                            
                                                                    <Button className="success" color="success" onClick={ () => updateData(item.id)} ><FaPen /></Button>
                                                                    
                                                                    <Button className="error" color="error" onClick={ () => deleteItem(item.id)}><MdDelete/></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }


                                            </tbody>
                                        </table>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default AddProductSIZE