import React, { useContext, useEffect, useState } from 'react';
import DashboardBox from '../Dashboard/components/dashboardBox';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { GiStarsStack } from "react-icons/gi";
import FormControl from '@mui/material/FormControl';
import { FaEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import { deleteData, fetchDataFromApi } from '../../utils/api';

import { MyContext } from '../../App';
import Rating from '@mui/material/Rating';

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

const Products = () => {

    const context = useContext(MyContext);
    const [productList, setProductList] = useState([]);
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showBy, setshowBy] = React.useState('');
    const [showBysetCatBy, setCatBy] = React.useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(35);
        fetchDataFromApi('/api/products').then((res) => {
            setProductList(res);
            context.setProgress(100);
        })
    }, []);
    // const deleteProduct=(id)=>{
    //     context.setProgress(30);
    //     deleteData(`/api/products/${id}`).then((res)=>{
    //         context.setProgress(100);
    //         context.setAlertBox({
    //             open:true,
    //             error:true,
    //             msg:'Sản phẩm đã bị xóa'
    //         });
    //         fetchDataFromApi('/api/products').then((res) => {
    //             setProductList(res)
    //         })
    //     })
    // };

    const deleteProduct = async (id) => {
        try {
            context.setProgress(30);
            const res = await deleteData(`/api/products/${id}`);
            context.setProgress(100);

            context.setAlertBox({
                open: true,
                error: false, // Đặt thành `false` vì xóa thành công
                msg: "Sản phẩm đã bị xóa thành công",
            });

            // Tải lại danh sách sản phẩm
            const updatedProducts = await fetchDataFromApi("/api/products");
            setProductList(updatedProducts);
        } catch (error) {
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Có lỗi xảy ra khi xóa sản phẩm",
            });
            console.error("Error deleting product:", error);
        }
    };

    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
            setProductList(res);
            context.setProgress(100);
        })
    };
    return <div>
        <>

            <div className="right-content w-100">
                <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0 '> DANH SÁCH SẢN PHẨM</h5>
                    <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                        <StyledBreadcrumb
                            components="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />} />
                        <StyledBreadcrumb
                            components="a"
                            label="Products"
                            href="#"
                        />
                    </Breadcrumbs>
                    <Link to='/product/upload'><Button className='btn-blue ml-3 pl-3 pr-3'>
                            Thêm sản phẩm</Button></Link>
                </div>
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<LuShoppingBag />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
                        </div>
                    </div>



                </div>
                <div className='card shadow border-0 p-3 mt-4'>
                    <h3 className="hd">Best Selling Products</h3>

                    <div className="row cardFilters mt-3">
                        <div className="col-md-3">
                            <h4>Show by</h4>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={showBysetCatBy}
                                    onChange={(e) => setshowBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-simple-select-helper-label"
                                    className="w-100"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-3">
                            <h4>Category By</h4>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={showBy}
                                    onChange={(e) => setCatBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-simple-select-helper-label"
                                    className="w-100"
                                >
                                    <MenuItem value="">
                                        <em value={null}>None</em>
                                    </MenuItem>
                                    {
                                        context.catData?.categoryList?.length !== 0 && context.catData?.categoryList?.map((cat, index) => {
                                            return (
                                                <MenuItem value={cat.id} key={index}>{cat.name}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>

                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Rating</th>
                                    <th>Discount</th>
                                    <th>Size</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList?.products?.length !== 0 && productList?.products?.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-align-items-center  productBox">
                                                        <div className="imgWrapper">
                                                            <div className="img card shadow m-0">
                                                                <img className="w-100" src={`${context.baseUrl}/uploads/${item.images[0]}`} />
                                                            </div>
                                                        </div>
                                                        <div className="info pl-3">
                                                            <h6>{item.name}</h6>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.category.name}</td>
                                                <td>{item.brand}</td>
                                                <td>
                                                    <del className="old">{item.oldPrice}đ</del>
                                                    <span className="new text-danger">{item.price}đ</span>
                                                </td>
                                                <td>{item.countInStock}</td>
                                                {/* <td><Rating name="read-only" defaultValue={item?.rating} precision={0.5} size="small" readOnly/></td> */}
                                                <td>{item.rating}</td>
                                                <td>{item.discount}</td>
                                                <td>{item?.productSIZE}</td>

                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to="/product/details">
                                                            <Button className="secondary" color="secondary"><FaEye /></Button>
                                                        </Link>
                                                        <Button className="success" color="success" >
                                                            <Link to={`/product/edit/${item.id}`}>
                                                                <Button className="success" color="success">
                                                                    <FaPen />
                                                                </Button>
                                                            </Link>


                                                        </Button>
                                                        <Button className="error" color="error" onClick={() => deleteProduct(item.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>


                                        )
                                    })
                                }


                            </tbody>
                        </table>
                        {
                            productList?.totalPages > 1 &&
                            <div className="d-flex tableFooter">

                                <Pagination className="pagination" count={productList?.totalPages}
                                    showFirstButton showLastButton color="primary" onChange={handleChange} />

                            </div>
                        }


                    </div>
                </div>
            </div>
        </>
    </div>;
};

export default Products;
