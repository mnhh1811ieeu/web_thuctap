import DashboardBox from "./components/dashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from 'react-icons/io';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";

import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { FaEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Pagination from '@mui/material/Pagination';
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
];
export const options = {
    'backgroundColor': 'transparent',
    'chartArea': {
        'width': '100%', 'height': '100%',

    }

};
const Dashboard = () => {
    const context = useContext(MyContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showBy, setshowBy] = React.useState('');
    const [showBysetCatBy, setCatBy] = React.useState('');
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const [productList, setProductList] = useState([]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
         context.setProgress( 35);
        fetchDataFromApi('/api/products').then((res) => {
            setProductList(res);
            context.setProgress( 100);
        })
    }, []);
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

    const handleChange=(event,value)=>{
        context.setProgress(40);
        fetchDataFromApi(`/api/products?page=${value}`).then((res)=>{
            setProductList(res);
            context.setProgress(100);
        })
    };
    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<LuShoppingBag />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
                        </div>
                    </div>
                    <div className="col-md-4 pl-0">
                        <div className="box graphBox">
                            <div className="d-flex align-items-center w-100 bottomEle">
                                <h6 className="text-white mb-0 mt-0">Tổng danh thu</h6>
                                <div className="ml-auto">
                                    <Button className="ml-auto toggleIcon" onClick={handleClick}>
                                        <HiDotsVertical />
                                    </Button>
                                    <Menu
                                        className='dropdown_menu'
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />Hôm qua</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />
                                            Tuần trước</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />
                                            Tháng trước</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IoIosTimer />Năm trước</MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            <h3 className="text-white font-weight-bold"> $34,444,455</h3>
                            <p>$20,000,000 tháng trước</p>
                            <Chart
                                chartType="PieChart"
                                width='100%'
                                height='170px'
                                data={data}
                                options={options}
                            />
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
                                    onChange={(e) =>setshowBy(e.target.value)}
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
                                    onChange={(e) =>setCatBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-simple-select-helper-label"
                                    className="w-100"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
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
                                                                <img className="w-100" src={item.images[0]} alt={item.name} /> {/* Sử dụng trực tiếp URL của Cloudinary */}
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
                                                    <del className="old">{item.oldPrice}</del>
                                                    <span className="new text-danger">{item.price}</span>
                                                </td>
                                                <td>{item.countInStock}</td>
                                                <td>{item.rating}</td>
                                                <td>{item.discount}</td>
                                                
                                                <td style={{width: "100px"}}>
                                                    {item?.productSIZE?.map ( (siz) =>{
                                                        return (
                                                            <span className='badge badge-primary'>{siz}</span>
                                                        )
                                                    })}
                                                </td>
                                               
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to="/product/details">
                                                            <Button className="secondary" color="secondary"><FaEye /></Button>
                                                        </Link>
                                                        <Button className="success" color="success" ><FaPen /></Button>
                                                        <Button className="error" color="error" onClick={()=>deleteProduct(item.id)}><MdDelete/></Button>
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
        </>
    )
}

export default Dashboard;