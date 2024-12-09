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

router.post('/add', async (req, res) => {

    let cartList = new Cart({
      productTitle: req.body.productTitle,
      images: req.body.image,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId: req.body.productId,
      userId: req.body.userId,
    });
  
    if (!cartList) {
        res.status(500).json({
          error: err,
          success: false
        })
    }
  
    cartList = await cartList.save();
    res.status(201).json(cartList);


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
      images: req.body.image,
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