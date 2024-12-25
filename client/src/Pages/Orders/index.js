
import React, { useEffect, useState } from 'react';
import { fetchDataFromApi, postDataUser } from '../../utils/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('pending'); // State quản lý tab hiện tại

    const getPaymentMethod = (orderReceipt) => {
        if (orderReceipt.startsWith("MOMO")) return "online";
        if (orderReceipt.startsWith("order_rcptid_")) return "cod";
        return "unknown";
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user.userId : null;

        if (userId) {
            fetchOrders(userId);
        } else {
            console.log('User ID không có trong localStorage');
            setLoading(false);
        }
    }, []);

    const handleOpenDialog = (products) => {
        setSelectedProducts(products);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    // const fetchOrders = async (userId) => {
    //     try {
    //         setLoading(true);
    //         const response = await fetchDataFromApi(`/api/order?userid=${userId}`);
    //         if (response && response.success && response.data) {
    //             setOrders(response.data);
    //         } else {
    //             console.log("Không có đơn hàng cho userId:", userId);
    //             setOrders([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //         setError('Có lỗi xảy ra khi lấy đơn hàng.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchOrders = async (userId) => {
        try {
            setLoading(true);
            const response = await fetchDataFromApi(`/api/order?userid=${userId}`);
            if (response && response.success && response.data) {
                // Sort the orders by 'createdAt' in descending order
                const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            } else {
                console.log("Không có đơn hàng cho userId:", userId);
                setOrders([]);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Có lỗi xảy ra khi lấy đơn hàng.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleStatusChange = async (orderReceipt) => {
        try {
            const response = await postDataUser("/api/order/update-status", {
                orderReceipt,
                newStatus: "delivered",
            });

            if (response && response.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_receipt === orderReceipt
                            ? { ...order, orderStatus: "delivered" }
                            : order
                    )
                );
                alert("Đơn hàng đã được xác nhận là đã nhận!");
            } else {
                alert(`Cập nhật thất bại: ${response.message || "Lỗi không xác định."}`);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error.message);
            alert("Đã xảy ra lỗi khi kết nối đến server. Vui lòng thử lại sau.");
        }
    };

    const filteredOrders = orders.filter((order) => order.orderStatus === activeTab);

    return (
        <section className="section">
            <div className="container">
                <h2 className="hd">Đơn hàng</h2>
                <div className="tabs">
                    <button
                        className={activeTab === 'pending' ? 'active' : ''}
                        onClick={() => setActiveTab('pending')}
                    >
                        Đang chuẩn bị
                    </button>
                    <button
                        className={activeTab === 'shipping' ? 'active' : ''}
                        onClick={() => setActiveTab('shipping')}
                    >
                        Đang giao
                    </button>
                    <button
                        className={activeTab === 'delivered' ? 'active' : ''}
                        onClick={() => setActiveTab('delivered')}
                    >
                        Giao thành công
                    </button>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Loại thanh toán</th>
                                    <th>Sản phẩm</th>
                                    <th>Tên người mua</th>
                                    <th>SDT</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái đơn hàng</th>
                                    <th>Tổng tiền</th>
                                    <th>Email</th>
                                    <th>Ngày</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{getPaymentMethod(order.order_receipt) === "online" ? "Online" : "COD"}</td>
                                            <td>
                                                <button onClick={() => handleOpenDialog(order.products)}>Xem sản phẩm</button>
                                            </td>
                                            <td>{order.name}</td>
                                            <td>{order.phoneNumber}</td>
                                            <td>{order.address}</td>
                                            <td>
                                                {
                                                    order.orderStatus === "pending" ? "Đang chuẩn bị hàng" :
                                                    order.orderStatus === "shipping" ? "Đang vận chuyển" :
                                                    order.orderStatus === "delivered" ? "Đã nhận hàng" :
                                                    "Trạng thái không xác định"
                                                }
                                            </td>
                                            <td>{order.amount} VNĐ</td>
                                            <td>{order.email}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                            <td>
                                                {order.orderStatus === "shipping" && order.orderStatus !== "delivered" && (
                                                    <button
                                                        onClick={() => handleStatusChange(order.order_receipt)}
                                                        disabled={order.orderStatus === "delivered"}
                                                    >
                                                        Đã nhận được hàng
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">Không có đơn hàng.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {isDialogOpen && (
                    <div className="dialog-overlay">
                        <div className="dialog">
                            <h3>Sản phẩm trong đơn hàng</h3>
                            <ul>
                                {selectedProducts.map((product, index) => (
                                    <li key={index}>
                                        <p><strong>ID Sản phẩm:</strong> {product.productId}</p>
                                        <p><strong>Tên sản phẩm:</strong> {product.productTitle}</p>
                                        <p><strong>Số lượng:</strong> {product.quantity}</p>
                                        <p><strong>Giá:</strong> {product.subTotal} VNĐ</p>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleCloseDialog}>Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Orders;

