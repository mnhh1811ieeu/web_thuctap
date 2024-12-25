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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const Dashboard = () => {
    const context = useContext(MyContext);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showBy, setshowBy] = React.useState('');
    const [showBysetCatBy, setCatBy] = React.useState('');
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([["Date", "Total Amount"]]);
    const [productList, setProductList] = useState([]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const calculateTotal = (data) => {
        let total = 0;
        data.forEach(order => {
            order.products.forEach(product => {
                total += product.subTotal; // Cộng dồn subTotal
            });
        });
        return total;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(35);
        fetchDataFromApi('/api/products').then((res) => {
            setProductList(res);
            context.setProgress(100);
        })
    }, []);
   

    const fetchUserCount = async () => await fetchDataFromApi('/api/user/get/count');
    const fetchProductCount = async () => await fetchDataFromApi('/api/products/get/count');
    const fetchOrderCount = async () => await fetchDataFromApi('/api/order/get/count');
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
    useEffect(() => {
        const loadOrderData = async () => {
            try {
                const response = await fetchDataFromApi('/api/order/all'); // Gọi API
                const orders = response?.data; // Check 'data' an toàn

                if (Array.isArray(orders)) {
                    const chartData = [["Date", "Total Amount"]]; // Dữ liệu biểu đồ
                    const aggregatedData = {};

                    orders.forEach(order => {
                        const date = new Date(order.createdAt).toLocaleDateString("vi-VN");
                        aggregatedData[date] = (aggregatedData[date] || 0) + order.amount;
                    });

                    for (const date in aggregatedData) {
                        chartData.push([date, aggregatedData[date]]);
                    }

                    setData(chartData); // Cập nhật dữ liệu cho biểu đồ
                } else {
                    console.error("Dữ liệu trả về không phải là mảng.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
            }
        };

        loadOrderData();
    }, []);

    const options = {
        title: "Doanh thu theo ngày",
        backgroundColor: "#fff",
        chartArea: { width: "85%", height: "65%" },
        hAxis: {
            title: "Ngày",
            textStyle: { color: "#333", fontSize: 12 }, // Đổi màu và size chữ trục X
            gridlines: { color: "#ddd" }, // Màu lưới trục X
        },
        vAxis: {
            title: "Doanh thu (VND)",
            textStyle: { color: "#333", fontSize: 12 }, // Đổi màu và size chữ trục Y
            gridlines: { color: "#ddd" }, // Màu lưới trục Y
        },
        legend: { position: "top", alignment: "center" }, // Chú thích đặt ở trên
        series: {
            0: { color: "#ff5733", lineWidth: 3, pointShape: "circle" },
        },
        pointsVisible: true,
        pointSize: 7,
        tooltip: { isHtml: true }, // Hiển thị tooltip chi tiết
        colors: ["#ff5733"], // Màu chính
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await fetchDataFromApi("/api/order/all"); // Sử dụng hàm fetchDataFromApi

            if (result.success) {
                const totalSubTotal = calculateTotal(result.data);
                setTotal(totalSubTotal); // Cập nhật state
            } else {
                setError("Lỗi khi lấy dữ liệu từ API.");
            }
        } catch (err) {
            setError("Có lỗi xảy ra: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const fetchTotalQuantity = async () => {
        try {
            const result = await fetchDataFromApi("/api/order/all"); // Gọi API dùng hàm chung
            if (result.success) {
                const totalQuantity = result.data.reduce((acc, order) => {
                    // Tính tổng quantity trong mảng products của từng order
                    const productQuantity = order.products.reduce((sum, product) => {
                        return sum + (product.quantity || 0);
                    }, 0);
    
                    return acc + productQuantity;
                }, 0);
                return { count: totalQuantity }; // Trả về count
            } else {
                return { count: 0 }; // Trả về 0 nếu API không thành công
            }
        } catch (error) {
            return { count: 0 }; // Trả về 0 nếu lỗi
        }
    };
    
    
    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8 d-flex">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox
                                color={["#1da256", "#48d483"]}
                                icon={<FaUserCircle />}
                                grow={true}
                                title="Tổng người dùng"
                                fetchUrl={fetchUserCount}
                            />
                            <DashboardBox
                                color={["#c012e2", "#eb64fe"]}
                                icon={<IoMdCart />}
                                grow={true}
                                title="Tổng sản phẩm"
                                fetchUrl={fetchProductCount}

                            />
                            <DashboardBox
                                color={["#2c78e5", "#60aff5"]}
                                icon={<LuShoppingBag />}
                                grow={true}
                                title="Tổng đơn hàng"
                                fetchUrl={fetchOrderCount}

                            />
                            <DashboardBox
                                title="Tổng sản phẩm bán được"
                                color={["#e1950e", "#f3cd29"]}
                                icon={<GiStarsStack />}
                                fetchUrl={fetchTotalQuantity} // Truyền hàm fetchUrl để DashboardBox gọi API
                                grow={true} // Tùy chỉnh grow nếu cần
                            />
                        </div>
                    </div>

                    <div className="box graphBox ">
                        <div className="d-flex align-items-center w-100 bottomEle">
                            <h6 className="text-white mb-0 mt-0">Tổng doanh thu</h6>
                            <div className="ml-auto">
                                <Button className="ml-auto toggleIcon" onClick={handleClick}>
                                    <HiDotsVertical />
                                </Button>
                                <Menu
                                    className="dropdown_menu"
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
                                        <IoIosTimer /> Theo tuần
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer /> Theo tháng
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer /> Theo năm
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>

                        <h3 className="text-white font-weight-bold">{total.toLocaleString("vi-VN")} VND</h3>
                        
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="300px"
                            data={data}
                            options={options}
                        />
                    </div>

                </div>
                <div className='card shadow border-0 p-3 mt-4'>
                    <h3 className="hd">Best Selling Products</h3>

                    <div className="row cardFilters mt-3">
                        {/* <div className="col-md-3">
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
                        </div> */}
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

                                                <td style={{ width: "100px" }}>
                                                    {item?.productSIZE?.map((siz) => {
                                                        return (
                                                            <span className='badge badge-primary'>{siz}</span>
                                                        )
                                                    })}
                                                </td>

                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to={`/product/details/${item.id}`}>
                                                            <Button className="secondary" color="secondary"><FaEye /></Button>
                                                        </Link>
                                                        <Button className="success" color="success">
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


                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;