const express = require('express');
const { Product } = require("../models/products.js");
const { Category } = require("../models/category.js");
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs=require("fs");
var imagesArr = [];
cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);

    },
})
const upload = multer({ storage: storage })
// router.post(`/upload`, upload.array("images"), async (req, res) => {
//     imagesArr = [];
//     const files = req.files;
//     for (let i = 0; i < files.length; i++) {
//         imagesArr.push(files[i].filename);
//     }
//     // console.log(imagesArr);
//     res.json({images:imagesArr});
// });
router.post(`/upload`, upload.array("images"), async (req, res) => {
    let imageUrls = [];

    // Lặp qua các file đã tải lên và tải chúng lên Cloudinary
    for (let i = 0; i < req.files.length; i++) {
        const localImagePath = `uploads/${req.files[i].filename}`;

        try {
            // Tải lên Cloudinary
            const result = await cloudinary.uploader.upload(localImagePath);
            // Lưu URL của ảnh vào mảng imageUrls
            imageUrls.push(result.secure_url);

            // Tùy chọn: Xóa file local sau khi tải lên Cloudinary
            fs.unlinkSync(localImagePath);

        } catch (error) {
            return res.status(500).json({ error: "Lỗi khi tải ảnh lên Cloudinary", details: error });
        }
    }

    // Trả về các URL ảnh thay vì chỉ tên file
    res.json({ images: imageUrls });
});





// Lấy danh sách tất cả sản phẩm
router.get(`/`, async (req, res) => {

    const page=parseInt(req.query.page) || 1;
    const perPage=10;
    const totalPosts = await Product.countDocuments();

    const totalPages= Math.ceil(totalPosts /perPage);

    if(page>totalPages){
        return res.status(404).json({message:"Không thấy trang"})
    }
    const productList = await Product.find().populate("category")
            .skip((page-1)*perPage)
            .limit(perPage)
            .exec();
    

    if (!productList) {
        res.status(500).json({ success: false })
    }
    return res.status(200).json({
        "products":productList,
        "totalPages":totalPages,
        "page":page
    });
    res.send(productList);

});
router.get(`/featured`, async (req, res) => {
    const productList = await Product.find( {isFeatured:true}); 
        if(!productList){
        res.status(500).json( { success :false})
    }
    return res.status(200).json(productList);
    })

// router.post(`/create`, async (req, res) => {


//     const category = await Category.findById(req.body.category);
//     if (!category) {
//         return res.status(404).send("Danh mục không tồn tại");
//     }

//     // const limit = pLimit(2);
//     // const imagesToUpload = req.body.images.map((image) => {
//     //     return limit(async () => {
//     //         const result = await cloudinary.uploader.upload(image);
//     //         //console.log(`succesful`)
//     //         //console.log(`result 1 24:14`)
//     //         return result;
//     //     }
//     //     )
//     // }
//     // );
//     // const uploadStatus = await Promise.all(imagesToUpload);
//     // const imgurl = uploadStatus.map((item) => {
//     //     return item.secure_url
//     // })
//     // if (!uploadStatus) {
//     //     return res.status(500).json({
//     //         error: "images cannot upload",
//     //         status: false
//     //     }

//     //     )
//    // }

//     let product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         images: imagesUrl,
//         brand: req.body.brand,
//         price: req.body.price,
//         category: req.body.category,
//         oldPrice:req.body.oldPrice,
//         countInStock: req.body.countInStock,
//         rating: req.body.rating,
//         // numReviews: req.body.numReviews,
//         isFeatured: req.body.isFeatured,
//         discount: req.body.discount,
//         productSIZE: req.body.productSIZE,
  

//     });
//     product = await product.save();
//     if (!product) {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     }
//     res.status(201).json(product)
// });
router.post('/create', upload.array('images', 10), async (req, res) => {
    // Kiểm tra xem danh mục có tồn tại không
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send("Danh mục không tồn tại");
    }
    

    // Kiểm tra ảnh trong body
    const files = req.files;  // Các file ảnh được upload tạm thời bởi multer

    if (!files || files.length === 0) {
        return res.status(400).json({
            message: "Ảnh sản phẩm là bắt buộc"
        });
    }

    // Upload ảnh lên Cloudinary
    const imageUrls = [];
    for (let file of files) {
        try {
            const result = await cloudinary.uploader.upload(file.path);  // Upload lên Cloudinary
            imageUrls.push(result.secure_url);  // Lưu URL của ảnh sau khi upload
        } catch (err) {
            console.error('Cloudinary upload error:', err);
            return res.status(500).json({ message: 'Lỗi khi tải ảnh lên Cloudinary', error: err });
        }
    }

    // Kiểm tra các trường dữ liệu khác
    if (!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).json({
            message: "Tên sản phẩm, mô tả và giá là bắt buộc"
        });
    }

    // Tạo một sản phẩm mới
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: imageUrls,  // Dùng URL ảnh từ Cloudinary
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        oldPrice: req.body.oldPrice,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        productSIZE: req.body.productSIZE,
    });

    try {
        // Lưu sản phẩm vào MongoDB
        product = await product.save();
        res.status(201).json(product);  // Trả về sản phẩm đã tạo
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Lỗi khi tạo sản phẩm",
            error: err
        });
    }
});


// router.delete(`/:id`, async (req, res) => {
//     const product=await Product.findById(req.params.id);
//     const images= product.images;
//     if(images.length!==0){
//         for (image of images){
//             fs.unlinkSync(`uploads/${image}`);
//         }
//     }
//     const deletProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletProduct) {
//         return res.status(404).json({
//             message: 'khong thay san pham',
//             status: false
//         })
//     } res.status(200).send({
//         message: 'Da xoa san pham',
//         status: true
//     })
// }
// )
router.delete('/:id', async (req, res) => {
    try {
        // Tìm sản phẩm theo ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm',
                status: false
            });
        }

        // Lấy danh sách ảnh của sản phẩm
        const images = product.images;
        if (images.length !== 0) {
            // Xóa từng ảnh trên Cloudinary
            for (const image of images) {
                // Lấy public_id từ URL (phần cuối của URL không bao gồm định dạng file)
                const publicId = image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId); // Xóa ảnh trên Cloudinary
            }
        }

        // Xóa sản phẩm khỏi cơ sở dữ liệu
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Không thể xóa sản phẩm',
                status: false
            });
        }

        res.status(200).json({
            message: 'Đã xóa sản phẩm thành công',
            status: true
        });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({
            message: 'Có lỗi xảy ra khi xóa sản phẩm',
            status: false,
            error: error.message
        });
    }
});
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500).json({
            message: 'khong co san pham voi id nay'
        })
    }
    return res.status(200).send(product);


});
// router.put('/:id', async (req, res) => {
//     // const limit = pLimit(2);
//     // const imagesToUpload = req.body.images.map((image) => {
//     //     return limit(async () => {
//     //         const result = await cloudinary.uploader.upload(image);
//     //         //console.log(`succesful`)
//     //         //console.log(`result 1 24:14`)
//     //         return result;
//     //     }
//     //     )
//     // }
//     // );
    
//     // const uploadStatus = await Promise.all(imagesToUpload);
//     // const imgurl = uploadStatus.map((item) => {
//     //     return item.secure_url
//     // })
//     // if (!uploadStatus) {
//     //     return res.status(500).json({
//     //         error: "images cannot upload",
//     //         status: false
//     //     }

//     //     )
//     // }
//     const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         {

//             name: req.body.name,
//             description: req.body.description,
//             images: imagesArr,
//             brand: req.body.brand,
//             price: req.body.price,
//             oldPrice: req.body.oldPrice,
//             category: req.body.category,
//             countInStock: req.body.countInStock,
//             rating: req.body.rating,
//             // numReviews: req.body.numReviews,
//             isFeatured: req.body.isFeatured,
//             discount: req.body.discount,
//             productSIZE: req.body.productSIZE
//         },
//         { new: true }
//     );
//     if (!product) {
//         res.status(404).json({
//             message: 'Khong the cap nhat',
//             status: false
//         })
//     }
//     res.status(200).json({
//         message: " da cap nhat",
//         status: true
//     })
// }
// );


// API PUT để cập nhật sản phẩm
router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: 'Sản phẩm không tồn tại',
                status: false
            });
        }

        const files = req.files;
        let imageUrls = [...product.images];  // Lấy ảnh hiện có của sản phẩm

        // Nếu có file ảnh mới, tải lên Cloudinary
        if (files && files.length > 0) {
            imageUrls = []; // Khởi tạo lại mảng ảnh

            for (let file of files) {
                try {
                    const result = await cloudinary.uploader.upload(file.path);
                    imageUrls.push(result.secure_url);  // Lưu URL ảnh vào mảng
                } catch (err) {
                    console.error('Cloudinary upload error:', err);
                    return res.status(500).json({ message: 'Lỗi khi tải ảnh lên Cloudinary', error: err });
                }
            }
        }

        // Cập nhật sản phẩm với các thông tin mới, bao gồm ảnh
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name || product.name,
                description: req.body.description || product.description,
                images: imageUrls,  // Đảm bảo hình ảnh được lưu
                brand: req.body.brand || product.brand,
                price: req.body.price || product.price,
                oldPrice: req.body.oldPrice || product.oldPrice,
                category: req.body.category || product.category,
                countInStock: req.body.countInStock || product.countInStock,
                rating: req.body.rating || product.rating,
                isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : product.isFeatured,
                discount: req.body.discount || product.discount,
                productSIZE: req.body.productSIZE || product.productSIZE,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(500).json({
                message: 'Không thể cập nhật sản phẩm',
                status: false
            });
        }

        res.status(200).json({
            message: 'Cập nhật sản phẩm thành công',
            status: true,
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Đã xảy ra lỗi trong khi cập nhật sản phẩm',
            status: false,
            error: error.message
        });
    }
});

module.exports = router;
