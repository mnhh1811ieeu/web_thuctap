
import React, { useEffect, useState } from 'react';
import { fetchDataFromApi, fetchDataFromApii, postDataUser } from '../../utils/api'; // Đảm bảo import đúng

const Orders = () => {
    const [orders, setOrders] = useState([]); // Danh sách đơn hàng
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Lỗi
    const [selectedTab, setSelectedTab] = useState('pending'); // Tab được chọn
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog mở/đóng
    const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm trong dialog
    const [transactionStatus, setTransactionStatus] = useState({}); // Trạng thái giao dịch

    const getPaymentMethod = (orderReceipt) => {
        if (orderReceipt.startsWith("MOMO")) {
            return "online";
        } else if (orderReceipt.startsWith("order_rcptid_")) {
            return "cod";
        } else {
            return "unknown";
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetchDataFromApi('/api/order/all');
                if (response && response.success && response.data) {
                    setOrders(response.data);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Có lỗi xảy ra khi lấy danh sách đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOpenDialog = (products) => {
        setSelectedProducts(products);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const checkTransactionStatus = async (orderId, paymentMethod) => {
        if (paymentMethod === "cod") {
            // Với COD, trạng thái mặc định là "Thanh toán COD"
            setTransactionStatus((prevStatus) => ({
                ...prevStatus,
                [orderId]: "Thanh toán COD",
            }));
            return;
        }

        try {
            const response = await fetchDataFromApii("/api/payment/transaction-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            setTransactionStatus((prevStatus) => ({
                ...prevStatus,
                [orderId]: response.resultCode === 0 ? "Thành công" : "Giao dịch thất bại",
            }));
        } catch (error) {
            console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
            setTransactionStatus((prevStatus) => ({
                ...prevStatus,
                [orderId]: "Lỗi khi kiểm tra trạng thái",
            }));
        }
    };
    const handleStatusChange = async (orderReceipt, newStatus) => {
        try {
            const response = await postDataUser("/api/order/update-status", {
                orderReceipt,
                newStatus,
            });
            if (response && response.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_receipt === orderReceipt
                            ? { ...order, orderStatus: newStatus }
                            : order
                    )
                );
                alert("Cập nhật trạng thái đơn hàng thành công!");
            } else {
                alert(`Cập nhật thất bại: ${response.message || "Lỗi không xác định."}`);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error.message);
            alert("Đã xảy ra lỗi khi kết nối đến server. Vui lòng thử lại sau.");
        }
    };

    // Lọc đơn hàng theo trạng thái
    const filteredOrders = orders.filter(order => order.orderStatus === selectedTab);

    return (
        <section className="section">
            <div className="container">
                <h2 className="hd">Đơn hàng</h2>

                <div className="tabs">
                    <button
                        className={selectedTab === 'pending' ? 'active' : ''}
                        onClick={() => setSelectedTab('pending')}
                    >
                        Hàng đang chuẩn bị
                    </button>
                    <button
                        className={selectedTab === 'shipping' ? 'active' : ''}
                        onClick={() => setSelectedTab('shipping')}
                    >
                        Hàng đang giao
                    </button>
                    <button
                        className={selectedTab === 'delivered' ? 'active' : ''}
                        onClick={() => setSelectedTab('delivered')}
                    >
                        Hàng giao thành công
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
                                    <th>Trạng thái thanh toán</th>
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
                                                {order.orderStatus === "delivered" ? (
                                                    <span>Vận chuyển thành công</span> // Nếu trạng thái là "delivered", chỉ hiển thị trạng thái.
                                                ) : (
                                                    <select
                                                        value={order.orderStatus}
                                                        onChange={(e) => handleStatusChange(order.order_receipt, e.target.value)}
                                                        disabled={order.orderStatus === "delivered"} // Disable nếu đã vận chuyển thành công
                                                    >
                                                        {order.orderStatus === "pending" && (
                                                            <option value="pending">Đang chuẩn bị hàng</option>
                                                        )}
                                                        {order.orderStatus !== "delivered" && (
                                                            <option value="shipping">Đang vận chuyển</option> // Chỉ cho phép chọn "Đang vận chuyển" khi không phải "delivered"
                                                        )}
                                                        {order.orderStatus === "shipping" && (
                                                            <option value="delivered">Vận chuyển thành công</option> // Chỉ cho phép chọn "Vận chuyển thành công" khi trạng thái là "shipping"
                                                        )}
                                                    </select>
                                                )}
                                            </td>


                                            <td>{order.amount} VNĐ</td>
                                            <td>{order.email}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                            <td>
                                                {transactionStatus[order.order_receipt] ? (
                                                    // Hiển thị kết quả trạng thái thanh toán
                                                    <span>{transactionStatus[order.order_receipt]}</span>
                                                ) : (
                                                    // Nút kiểm tra thanh toán nếu chưa có kết quả
                                                    <button
                                                        onClick={() =>
                                                            checkTransactionStatus(
                                                                order.order_receipt,
                                                                getPaymentMethod(order.order_receipt)
                                                            )
                                                        }
                                                    >
                                                        Kiểm Tra Thanh Toán
                                                    </button>
                                                )}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">Không có đơn hàng trong mục này.</td>
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
