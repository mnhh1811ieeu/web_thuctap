const express = require('express');
const router = express.Router();
const { Order } = require("../models/orders.js");

router.get('/', async (req, res) => {
    
});
router.post('/', async (req, res) => {
    try {
      // Lấy dữ liệu từ body của request
      const { name, phoneNumber, address, pincode, email, amount, order_receipt, userid, products } = req.body;
  
      // Kiểm tra dữ liệu đầu vào
      if (!name || !phoneNumber || !address || !pincode || !email || !amount || !order_receipt || !userid || !products) {
        return res.status(400).json({
          message: 'Thiếu thông tin cần thiết để tạo đơn hàng.',
        });
      }
  
      // Tạo đối tượng Order mới
      const newOrder = new Order({
        name,
        phoneNumber,
        address,
        pincode,
        email,
        amount,
        order_receipt,
        userid,
        products,
      });
  
      // Lưu vào database
      const savedOrder = await newOrder.save();
  
      // Phản hồi thành công
      res.status(201).json({
        message: 'Đơn hàng đã được tạo thành công.',
        data: savedOrder,
      });
    } catch (err) {
      console.error('Lỗi trong quá trình tạo đơn hàng:', err);
  
      // Phản hồi lỗi
      res.status(500).json({
        message: 'Có lỗi xảy ra trong quá trình tạo đơn hàng.',
        error: err.message || err,
      });
    }
  });

module.exports = router;