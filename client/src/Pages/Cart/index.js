import React, { useContext, useState, useEffect } from 'react';

import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";

import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import QuantityBox from '../../Components/QuantityBox/QuantityBox';

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const context = useContext(MyContext);
    const [cartData, setCartData] = useState([]);

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     const userId = user?.userId;

    //     if (userId) {
    //         fetchDataFromApi(`/api/cart?userId=${userId}`).then((res) => {
    //             setCartData(res);
    //             setIsLoading(false);
    //         }).catch((error) => {
    //             setIsLoading(false);
    //             console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
    //         });
    //     } else {
    //         setIsLoading(false);
    //         console.log("Không tìm thấy userId trong localStorage");
    //     }
    // }, []);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;

        if (userId) {
            // Fetch cart items first
            fetchDataFromApi(`/api/cart?userId=${userId}`)
                .then((cartRes) => {
                    setCartData(cartRes); // Set cart data

                    // Fetch product details for each productId in the cart
                    const productIds = cartRes.map(item => item.productId);
                    
                    // Get product details (e.g., countInStock)
                    Promise.all(
                        productIds.map(productId =>
                            fetchDataFromApi(`/api/products/${productId}`)
                                .then((productRes) => {
                                    setProductDetails(prevState => ({
                                        ...prevState,
                                        [productId]: productRes, // Store product details in the state
                                    }));
                                })
                                .catch((error) => {
                                    console.error(`Lỗi khi lấy thông tin sản phẩm ${productId}:`, error);
                                })
                        )
                    ).finally(() => {
                        setIsLoading(false); // Set loading state to false after all API calls
                    });
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
                });
        } else {
            setIsLoading(false);
            console.log("Không tìm thấy userId trong localStorage");
        }
    }, []);
    // const handleQuantityChange = (item, newQuantity) => {
    //     const updatedItem = {
    //         ...item,
    //         quantity: newQuantity,
    //         subTotal: newQuantity * item.price,
    //     };
    
    //     setIsLoading(true);
    //     editData(`/api/cart/${item._id}`, updatedItem)
    //         .then(() => {
    //             // Cập nhật trạng thái giỏ hàng ngay lập tức
    //             setCartData((prevData) =>
    //                 prevData.map((i) => (i._id === item._id ? updatedItem : i))
    //             );
    //             setIsLoading(false);
    
    //             // Hiển thị thông báo thành công
    //             context.setAlertBox({
    //                 open: true,
    //                 error: false,
    //                 msg: `Cập nhật số lượng của sản phẩm "${item.productTitle}" thành công!`,
    //             });
    //         })
    //         .catch(() => {
    //             setIsLoading(false);
    
    //             // Hiển thị thông báo thất bại
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: `Cập nhật số lượng sản phẩm "${item.productTitle}" thất bại!`,
    //             });
    //         });
    // };
    const handleQuantityChange = (item, newQuantity) => {
        // Lấy thông tin sản phẩm từ API
        fetchDataFromApi(`/api/products/${item.productId}`).then((product) => {
            // Kiểm tra nếu số lượng mới vượt quá số lượng tồn kho
            if (newQuantity > product.countInStock) {
                // Hiển thị thông báo lỗi nếu số lượng yêu cầu vượt quá tồn kho
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: `Số lượng yêu cầu (${newQuantity}) vượt quá số lượng tồn kho (${product.countInStock})!`,
                });
                return; // Dừng việc thay đổi số lượng nếu vượt quá tồn kho
            }
    
            // Nếu số lượng hợp lệ, tiến hành cập nhật giỏ hàng
            const updatedItem = {
                ...item,
                quantity: newQuantity,
                subTotal: newQuantity * item.price,
            };
    
            setIsLoading(true);
            editData(`/api/cart/${item._id}`, updatedItem)
                .then(() => {
                    // Cập nhật trạng thái giỏ hàng ngay lập tức
                    setCartData((prevData) =>
                        prevData.map((i) => (i._id === item._id ? updatedItem : i))
                    );
                    setIsLoading(false);
    
                    // Hiển thị thông báo thành công
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: `Cập nhật số lượng của sản phẩm "${item.productTitle}" thành công!`,
                    });
                })
                .catch(() => {
                    setIsLoading(false);
    
                    // Hiển thị thông báo thất bại
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: `Cập nhật số lượng sản phẩm "${item.productTitle}" thất bại!`,
                    });
                });
        }).catch((error) => {
            console.error("Error fetching product data:", error);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Lỗi khi lấy dữ liệu sản phẩm, vui lòng thử lại!",
            });
        });
    };
    
    const removeItem = (id) => {
        deleteData(`/api/cart/${id}`).then(() => {
            setCartData((prevData) => prevData.filter((item) => item._id !== id));
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Sản phẩm đã được xóa khỏi giỏ hàng",
            });
        }).catch(() => {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Xóa sản phẩm thất bại",
            });
        });
    };

    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Giỏ hàng</h2>
                    <p>Có <b className='text-red'>{cartData.length}</b> sản phẩm trong giỏ hàng của bạn</p>
                    <div className='row'>
                        <div className="col-md-9 pr-5">
                            <div className="table-responsive">
                                <table className='table' padding="10px">
                                    <thead>
                                        <tr>
                                            <th width="35%">Sản phẩm</th>
                                            <th width="15%">Giá sản phẩm</th>
                                            <th width="30%">Số lượng</th>
                                            <th width="18%">Tổng đơn</th>
                                            <th width="5%">Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((item) => (
                                            <tr key={item._id}>
                                                <td width="40%">
                                                    <Link to={`/product/${item.productId}`}>
                                                        <div className="d-flex align-items-center CartItemimgWrapper">
                                                            <div className="imgWrapper">
                                                                <img src={item.images} alt={item.productTitle} className="w-100" />
                                                            </div>
                                                            <div className="info px-3">
                                                                <h6>{item.productTitle}</h6>
                                                                <Rating name="read-only" value={item.rating} readOnly size="small" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td width="17%">{(item.price).toLocaleString()} VND</td>
                                                <td width="20%">
                                                    <QuantityBox
                                                        initialQuantity={item.quantity}
                                                        onQuantityChange={(newQuantity) => handleQuantityChange(item, newQuantity)}
                                                    />
                                                </td>
                                                <td width="18%">{(item.subTotal).toLocaleString()} VND</td>
                                                <td width="5%">
                                                    <span className="remove" onClick={() => removeItem(item._id)}>
                                                        <IoMdClose />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='card border p-3 cartDetails'>
                                <h4>Tổng giỏ hàng</h4>
                                <div className='table-responsive mt-3'>
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Số tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartData?.length !== 0 && cartData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.productTitle?.substr(0,10) + '...'}</td>
                                                        <td>{item?.quantity}</td> {/* Chỉ hiển thị số lượng đã thay đổi ở phần giỏ hàng */}
                                                        <td>{(item?.price * item?.quantity).toLocaleString()} VNĐ</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td><b>Tổng số tiền</b></td>
                                                <td></td>
                                                <td>
                                                    {
                                                        cartData.length !== 0 &&
                                                        cartData.map(item => item.price * item.quantity)
                                                            .reduce((total, value) => total + value, 0)
                                                            .toLocaleString()
                                                    }
                                                    VNĐ
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                <Link to="/checkout">
                                    <Button className="btn-blue bg-red btn-lg btn-big ml-3">
                                        <CiShoppingCart />Thanh toán
                                    </Button>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            {isLoading && <div className='loading'></div>}
        </>
    );
};

export default Cart;
