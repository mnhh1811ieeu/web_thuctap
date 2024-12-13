// controllers/orders.js
const mongoose = require('mongoose');

// Định nghĩa schema cho đơn hàng
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    order_receipt: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productTitle: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            subTotal: { type: Number, required: true },
            images: { type: String, required: true },
            rating: { type: Number },
        },
    ],
}, { timestamps: true });

// Tạo model
const Order = mongoose.model('Order', orderSchema);

// Hàm tạo và lưu đơn hàng vào MongoDB
const createOrder = async (orderData) => {
    const { name, phoneNumber, address, pincode, email, amount, order_receipt, userid, products } = orderData;

    try {
        const newOrder = new Order({
            name,
            phoneNumber,
            address,
            pincode,
            email,
            amount,
            order_receipt,
            userid,
            products
        });

        // Lưu vào MongoDB
        const savedOrder = await newOrder.save();
        return savedOrder;
    } catch (error) {
        console.error('Error saving order:', error);
        throw new Error('Failed to save order');
    }
};

module.exports = { createOrder };
