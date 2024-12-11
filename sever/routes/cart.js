const { Cart } = require('../models/cart');
const express = require('express');
const router = express.Router();

// Get /cart
router.get(`/`, async (req, res) => {
    try {
        const cartList = await Cart.find(req.query);

        if (!cartList) {
            res.status(500).json({ success: false })
        }
        return res.status(200).json(cartList);
    }
    catch (error) {
        res.status(500).json({ success: false })
    }
});

// router.post('/add', async (req, res) => {

//     let cartList = new Cart({
//       productTitle: req.body.productTitle,
//       images: req.body.image,
//       rating: req.body.rating,
//       price: req.body.price,
//       quantity: req.body.quantity,
//       subTotal: req.body.subTotal,
//       productId: req.body.productId,
//       userId: req.body.userId,
//     });
  
//     if (!cartList) {
//         res.status(500).json({
//           error: err,
//           success: false
//         })
//     }
  
//     cartList = await cartList.save();
//     res.status(201).json(cartList);


// });
//2
// router.post('/add', async (req, res) => {
//   try {
//       // Kiểm tra xem dữ liệu có đầy đủ không
//       if (!req.body.productTitle || !req.body.images || !req.body.rating || !req.body.price || !req.body.quantity || !req.body.subTotal || !req.body.productId || !req.body.userId) {
//           return res.status(400).json({
//               error: "Missing required fields",
//               success: false
//           });
//       }

//       let cartList = new Cart({
//           productTitle: req.body.productTitle,
//           images: req.body.images,
//           rating: req.body.rating,
//           price: req.body.price,
//           quantity: req.body.quantity,
//           subTotal: req.body.subTotal,
//           productId: req.body.productId,
//           userId: req.body.userId,
//       });

//       // Lưu sản phẩm vào giỏ hàng
//       cartList = await cartList.save();
//       res.status(201).json(cartList);
//   } catch (err) {
//       console.error("Error saving cart:", err);
//       res.status(500).json({
//           error: err.message,
//           success: false
//       });
//   }
// });
router.post('/add', async (req, res) => {
    try {
        const { productTitle, images, rating, price, quantity, subTotal, productId, userId } = req.body;

        if (!productTitle || !images || !rating || !price || !quantity || !subTotal || !productId || !userId) {
            return res.status(400).json({ success: false, error: "Thiếu dữ liệu đầu vào" });
        }

        const existingCartItem = await Cart.findOne({ productId, userId });

        if (existingCartItem) {
            return res.status(400).json({ success: false, message: "Sản phẩm đã có trong giỏ hàng" });
        }

        const cartItem = new Cart({
            productTitle,
            images,
            rating,
            price,
            quantity,
            subTotal,
            productId,
            userId
        });

        await cartItem.save();
        res.status(201).json({ success: true, message: "Thêm sản phẩm thành công", cart: cartItem });
    } catch (err) {
        console.error("Error saving cart:", err);
        res.status(500).json({ success: false, error: "Lỗi khi thêm sản phẩm vào giỏ hàng" });
    }
});


// API kiểm tra sản phẩm đã có trong giỏ hàng chưa
router.post('/check', async (req, res) => {
    try {
        const { productId, userId } = req.body;

        if (!productId || !userId) {
            return res.status(400).json({ success: false, error: "Thiếu dữ liệu đầu vào" });
        }

        const existingCartItem = await Cart.findOne({ productId, userId });
        res.status(200).json({ exists: !!existingCartItem });
    } catch (err) {
        console.error("Error checking cart:", err);
        res.status(500).json({ success: false, error: "Lỗi khi kiểm tra giỏ hàng" });
    }
});

router.delete('/:id', async (req, res) => {
    const cartItem = await Cart.findById(req.params.id);

    if(!cartItem){
      res.status(404).json({msg: "Không tìm thấy mục giỏ hàng đã cung cấp id!"})
    }

    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        res.status(404).json({
            message: 'Khong tim thay muc gio hang',
            success: false
        })
    }
    res.status(200).json({
        success: true,
        message: 'Xoa muc gio hang thanh cong'
    })
});

router.put('/:id', async (req, res) => {

  const cartList = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      productTitle: req.body.productTitle,
      images: req.body.images,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId: req.body.productId,
      userId: req.body.userId
    },
    {new: true}
  )

  if (!cartList) {
    return res.status(500).json({
      message: 'Muc gio hang khong cap nhat thanh cong',
      success: false
    })
  }
  res.send(cartList);
})

module.exports = router;