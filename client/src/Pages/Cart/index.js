import React, { useContext, useState, useEffect } from 'react';

import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";

import { MyContext } from '../../App';
import { deleteCartData, deleteData, editData, fetchDataFromApi, fetchDataFromApii } from '../../utils/api';
import QuantityBox from '../../Components/QuantityBox/QuantityBox';

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productQuantity, setProductQuantity] = useState(); // Giữ lại state này
    const context = useContext(MyContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;

        if (userId) {
            fetchDataFromApi(`/api/cart?userId=${userId}`).then((res) => {
                setCartData(res);
                setIsLoading(false);
            }).catch((error) => {
                setIsLoading(false);
                console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
            });
        } else {
            setIsLoading(false);
            console.log("Không tìm thấy userId trong localStorage");
        }
    }, []);

    const handleQuantityChange = (item, newQuantity) => {
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
    };
    
    

    const removeItem = (id) => {
        deleteData(`/api/cart/${id}`).then(() => {
            setCartData((prevData) => prevData.filter((item) => item._id !== id));
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Sản phẩm đã được xóa khỏi giỏ hàng",
            });
    
            // Tải lại trang sau khi xóa thành công
            window.location.href=window.location.href
        }).catch((error) => {
            // Xử lý lỗi nếu có
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Xóa sản phẩm thất bại",
            });
        });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;

        if (userId) {
            fetchDataFromApi(`/api/order?userid=${userId}`)
                .then(async (orderResponse) => {
                    console.log("Danh sách đơn hàng:", orderResponse.data);
                    
                    // Lấy orderId của phần tử cuối cùng
                    const data = orderResponse.data[orderResponse.data.length - 1];
                    const orderId = data.order_receipt;
                    console.log("Order ID của phần tử cuối cùng:", orderId);
                    
                    // Gọi API để lấy giỏ hàng
                    const cartResponse = await fetchDataFromApi(`/api/cart?userId=${userId}`);
                    console.log("Danh sách giỏ hàng:", cartResponse);
                    
                    
                    
                    // So sánh _id của các sản phẩm trong cart và order
                    const cartProductIds = cartResponse.map((cartItem) => cartItem._id);
                    const orderProductIds = data.products.map((product) => product._id);
                    // Kiểm tra hai mảng phải giống nhau hoàn toàn (bao gồm cả thứ tự)
                    const areArraysEqual = (array1_1, array2) => {
                        if (array1_1.length !== array2.length) return false; // Kiểm tra độ dài
                        return array1_1.every((value, index) => value === array2[index]); // So sánh từng phần tử
                    };
                    const isMatching = areArraysEqual(orderProductIds, cartProductIds);
                    if (isMatching) {
                        const cartProducts = cartResponse.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        }));
                        console.log(cartProducts)
                        for (const cartProduct of cartProducts) {
                            await fetchDataFromApii(`/api/products/${cartProduct.productId}/reduce-stock`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    countInStock: -cartProduct.quantity, // Giảm số lượng tồn kho
                                }),
                            });
                            
                        }


                        // Kiểm tra trạng thái giao dịch
                        return fetchDataFromApii("/api/payment/transaction-status", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId }),
                        });
                    } else {
                        throw new Error("Không khớp sản phẩm giữa cart và order.");
                    }
                })
                .then((paymentResponse) => {
                    console.log("Trạng thái giao dịch:", paymentResponse);
        
                    // Kiểm tra nếu giao dịch thành công
                    if (paymentResponse.message === 'Thành công.' && paymentResponse.resultCode === 0) {
                        return deleteCartData(`/api/cart?userId=${userId}`).then(
                            window.location.reload(true)
                        )
                    } else {
                        console.log("Giao dịch không thành công.");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi trong quá trình xử lý:", error);
                });
        }
        
        
    }, []);

    
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
