import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api'; // Đảm bảo import đúng

const Orders = () => {
    const [orders, setOrders] = useState([]); // State lưu danh sách đơn hàng
    const [loading, setLoading] = useState(true); // State quản lý trạng thái loading
    const [error, setError] = useState(null); // Thêm state để xử lý lỗi
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái mở/đóng dialog
    const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm được chọn

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage
        const userId = user ? user.userId : null; // Lấy userId từ thông tin user

        if (userId) {
            // Nếu có userId, gọi API lấy đơn hàng
            fetchOrders(userId);
        } else {
            console.log('User ID không có trong localStorage');
            setLoading(false); // Nếu không có userId, dừng loading
        }
    }, []); // Empty dependency array để chạy 1 lần khi component mount

    const handleOpenDialog = (products) => {
        setSelectedProducts(products); // Cập nhật sản phẩm đã chọn
        setIsDialogOpen(true); // Mở dialog
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Đóng dialog
    };

    // Hàm gọi API để lấy đơn hàng
    const fetchOrders = async (userId) => {
        try {
            setLoading(true); // Bắt đầu loading
            const response = await fetchDataFromApi(`/api/order?userid=${userId}`);

            // Kiểm tra dữ liệu trả về và gán dữ liệu vào state
            if (response && response.success && response.data) {
                setOrders(response.data); // Lưu dữ liệu vào state orders
            } else {
                console.log("Không có đơn hàng cho userId:", userId);
                setOrders([]); // Nếu không có dữ liệu, set state là mảng rỗng
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Có lỗi xảy ra khi lấy đơn hàng.');
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        <section className="section">
            <div className='container'>
                <h2 className='hd'>Orders</h2>

                {loading ? (
                    <div>Loading...</div> // Hiển thị loading nếu đang tải dữ liệu
                ) : error ? (
                    <div>{error}</div> // Hiển thị thông báo lỗi nếu có
                ) : (
                    <div className='table-responsive'>
                        <table className='table table-striped'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Payment Id</th>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Phone num</th>
                                    <th>Add</th>
                                    <th>Pincode</th>
                                    <th>Total amount</th>
                                    <th>Email</th>
                                    <th>User id</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.order_receipt}</td>
                                            <td>
                                                {/* Nút Xem sản phẩm */}
                                                <button onClick={() => handleOpenDialog(order.products)}>Xem sản phẩm</button>
                                            </td>
                                            <td>{order.name}</td>
                                            <td>{order.phoneNumber}</td>
                                            <td>{order.address}</td>
                                            <td>{order.pincode}</td>
                                            <td>{order.amount} VNĐ</td>
                                            <td>{order.email}</td>
                                            <td>{order.userid}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Dialog hiển thị sản phẩm */}
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
        </section>
    );
};

export default Orders;
