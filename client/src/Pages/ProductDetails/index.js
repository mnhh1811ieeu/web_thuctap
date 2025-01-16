import { Button, Rating } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import ProductZoom from '../../Components/ProductZoom/ProductZoom'
import QuantityBox from '../../Components/QuantityBox/QuantityBox'
import { IoCart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData, postDataUser } from '../../utils/api';
import { useSEO } from '../../SEOProvider';

const ProductDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setIsRating] = useState(1);
    const [activeTabs, setActiveTabs] = useState(0);
    const [activeSize, setActiveSize] = useState(null);
    // const [currentProduct, setCurrentProduct] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [tabError, setTabError] = useState(false);
    const [addingInCart, setAddingInCart] = useState(false);
    const context = useContext(MyContext);
    const [hasPurchased, setHasPurchased] = useState(false);

    const [productData, setProductData] = useState([]);
    const [relatedProductData, setRelatedProductData] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);


    const { id } = useParams();
    const { setSEO } = useSEO();

    const isActive = (index) => {
        setActiveSize(index);
        setTabError(false);
    }
    const [reviews, setReviews] = useState({
        productId: "",
        customerName: "",
        customerId: "",
        review: "",
        customerRating: 0
    });

    const splitId = (params) => {
        const temp = params.split('.html');
        const temp1 = temp[0].split('-');
        const id = temp1[temp1.length - 1]
        return id;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDataFromApi(`/api/products/${splitId(id)}`).then((res) => {
            setProductData(res)
            setSEO(`Mua ${res.name} tại BHM-Store`, `${res.name} tại BHM-Store với giá cực tốt.Mua hàng nhanh chóng thanh toán an toàn tại BHM-Store. Mua ngay!`);
            //console.log(splitId(id))
            fetchDataFromApi(`/api/products?catName=${res.catName}`).then((res) => {
                const filterdData = res?.products?.filter(item => item.id !== splitId(id));
                setRelatedProductData(filterdData);
                
            })
            // postData(`/api/products/recentlyViewed`,res).then( (res) => {
            //     fetchDataFromApi(`/api/products/recentlyViewed`).then( (response) => {
            //         const uniqueItems = Array.from(new Set(response.map(item => item.id)))
            //              .map(id => {
            //              return response.find(item => item.id === id)            
            //})
            //         setRecentlyViewed(uniqueItems);
            //     })
            // })
        })
        fetchDataFromApi(`/api/productReviews?productId=${splitId(id)}`).then((res => {
            setReviewData(res)
        }))
        
    }, [id, setSEO])

    const ensureArray = (data) => {
        // Nếu data là mảng, kiểm tra từng phần tử trong mảng
        if (Array.isArray(data)) {
            return data.flatMap(item => {
                // Nếu phần tử là chuỗi và có dấu phẩy, tách chuỗi ra thành mảng
                if (typeof item === 'string' && item.includes(',')) {
                    return item.split(',');  // Tách chuỗi thành mảng
                }
                return item;  // Nếu không, giữ nguyên phần tử
            });
        }
        // Nếu data là chuỗi, tách chuỗi thành mảng
        return data ? data.split(',') : [];
    };
    const sizes = ensureArray(productData?.productSIZE);
    // const addReview = (e) => {
    //     e.preventDefault();

    //     const user = JSON.parse(localStorage.getItem("user"));
    //     reviews.customerName = user?.name;
    //     reviews.customerId = user?.userId;
    //     reviews.productId = id;

    //     setIsLoading(true);
    //     postData("/api/productReviews/add", reviews).then((res) => {
    //         setIsLoading(false);
    //         reviews.customerRating = 1;
    //         setReviews({
    //             review: "",
    //             customerRating: 1
    //         })
    //         fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
    //             setReviewData(res)
    //         })
    //     })
    // }
    const addReview = (e) => {
        e.preventDefault();
    
        // Kiểm tra nếu người dùng chưa mua sản phẩm
        if (!hasPurchased) {
            alert("Bạn chỉ có thể đánh giá khi đã mua sản phẩm này");
            return;
        }
    
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!user) {
            alert("Bạn cần đăng nhập để đánh giá");
            return;
        }
    
        reviews.customerName = user?.name;
        reviews.customerId = user?.userId;
        reviews.productId = splitId(id);
        console.log(reviews.productId)

        setIsLoading(true);
        postData("/api/productReviews/add", reviews)
            .then((res) => {
                setIsLoading(false);
                reviews.customerRating = 1; // Reset rating
                setReviews({
                    review: "",
                    customerRating: 1,
                });
    
                
            fetchDataFromApi(`/api/productReviews?productId=${splitId(id)}`).then((res) => {
                setReviewData(res)
            })
        })

            .catch((error) => {
                setIsLoading(false);
                console.error("Error adding review:", error);
                alert("Không thể thêm đánh giá. Hãy thử lại sau.");
            });
    };
    
    const onChangeInput = (e) => {
        setReviews(() => ({
            ...reviews,
            [e.target.name]: e.target.value
        }))
    }
    const onChangeRating = (e) => {
        setIsRating(e.target.value)
        reviews.customerRating = e.target.value
    }


    let [productQuantity, setProductQuantity] = useState();

    const quantity = (val) => {
        setProductQuantity(val)
    }

    // const addtoCart = () => {
    //     if (activeSize !== null) {
    //         const user = JSON.parse(localStorage.getItem("user"));

    //         if (!user) {
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng!"
    //             });
    //             return;
    //         }

    //         // Kiểm tra tính hợp lệ của dữ liệu sản phẩm
    //         if (!productData || !productData.id || !productData.name || !productData.images?.length || !productData.price || !productData.rating) {
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "Thông tin sản phẩm không đầy đủ hoặc không hợp lệ!"
    //             });
    //             return;
    //         }

    //         // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    //         fetchDataFromApi(`/api/cart?userId=${user.userId}`).then((cartItems) => {
    //             const existingItem = cartItems.find((item) => item.productId === productData.id);

    //             if (existingItem) {
    //                 // Nếu sản phẩm đã tồn tại, hiện thông báo
    //                 context.setAlertBox({
    //                     open: true,
    //                     error: true,
    //                     msg: "Sản phẩm đã có trong giỏ hàng!"
    //                 });
    //             } else {
    //                 // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
    //                 const cartFields = {
    //                     productTitle: productData.name,
    //                     images: productData.images[0] || '/path-to-default-image.jpg', // Dùng ảnh mặc định nếu thiếu
    //                     rating: productData.rating,
    //                     price: productData.price,
    //                     quantity: productQuantity || 1, // Giá trị mặc định là 1 nếu `productQuantity` không tồn tại
    //                     subTotal: productData.price * (productQuantity || 1),
    //                     productId: productData.id,
    //                     userId: user.userId
    //                 };

    //                 console.log("Cart Fields:", cartFields);

    //                 // Bắt đầu quá trình thêm sản phẩm
    //                 setAddingInCart(true);

    //                 postDataUser(`/api/cart/add`, cartFields)
    //                     .then((res) => {
    //                         console.log("API Response:", res);

    //                         if (res?.success) {
    //                             context.setAlertBox({
    //                                 open: true,
    //                                 error: false,
    //                                 msg: res.message || "Sản phẩm đã được thêm vào giỏ hàng!"
    //                             });
    //                         } else {
    //                             context.setAlertBox({
    //                                 open: true,
    //                                 error: true,
    //                                 msg: res?.message || "Không thể thêm sản phẩm vào giỏ hàng!"
    //                             });
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         console.error("Error from API call:", error);
    //                         context.setAlertBox({
    //                             open: true,
    //                             error: true,
    //                             msg: "Có lỗi trong quá trình xử lý, vui lòng thử lại!"
    //                         });
    //                     })
    //                     .finally(() => {
    //                         // Kết thúc quá trình xử lý
    //                         setTimeout(() => {
    //                             setAddingInCart(false);
    //                         }, 1000);
    //                     });
    //             }
    //         }).catch((error) => {
    //             console.error("Error fetching cart items:", error);
    //             context.setAlertBox({
    //                 open: true,
    //                 error: true,
    //                 msg: "Có lỗi trong quá trình kiểm tra giỏ hàng, vui lòng thử lại!"
    //             });
    //         });
    //     } else {
    //         setTabError(true);
    //         context.setAlertBox({
    //             open: true,
    //             error: true,
    //             msg: "Vui lòng chọn kích thước sản phẩm trước khi đặt hàng!"
    //         });
    //     }
    // };
    const addtoCart = () => {
        if (activeSize !== null) {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng!"
                });
                return;
            }

            // Kiểm tra tính hợp lệ của dữ liệu sản phẩm
            if (!productData || !productData.id || !productData.name || !productData.images?.length || !productData.price || !productData.rating) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Thông tin sản phẩm không đầy đủ hoặc không hợp lệ!"
                });
                return;
            }

            // Kiểm tra tồn kho (frontend check)
            const quantity = productQuantity || 1; // Giá trị mặc định nếu không có quantity
            if (quantity > productData.countInStock) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: `Số lượng yêu cầu (${quantity}) vượt quá hàng tồn kho (${productData.countInStock}).`
                });
                return; // Dừng lại, không tiếp tục gửi request
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            fetchDataFromApi(`/api/cart?userId=${user.userId}`).then((cartItems) => {
                const existingItem = cartItems.find((item) => item.productId === productData.id);

                if (existingItem) {
                    // Nếu sản phẩm đã tồn tại, hiện thông báo
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Sản phẩm đã có trong giỏ hàng!"
                    });
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
                    const cartFields = {
                        productTitle: productData.name,
                        images: productData.images[0] || '/path-to-default-image.jpg', // Dùng ảnh mặc định nếu thiếu
                        rating: productData.rating,
                        price: productData.price,
                        quantity: quantity,
                        subTotal: productData.price * quantity,
                        productId: productData.id,
                        userId: user.userId
                    };

                    console.log("Cart Fields:", cartFields);

                    // Bắt đầu quá trình thêm sản phẩm
                    setAddingInCart(true);

                    postDataUser(`/api/cart/add`, cartFields)
                        .then((res) => {
                            console.log("API Response:", res);

                            if (res?.success) {
                                context.setAlertBox({
                                    open: true,
                                    error: false,
                                    msg: res.message || "Sản phẩm đã được thêm vào giỏ hàng!"
                                });
                            } else {
                                context.setAlertBox({
                                    open: true,
                                    error: true,
                                    msg: res?.message || "Không thể thêm sản phẩm vào giỏ hàng!"
                                });
                            }
                        })
                        .catch((error) => {
                            console.error("Error from API call:", error);
                            context.setAlertBox({
                                open: true,
                                error: true,
                                msg: "Có lỗi trong quá trình xử lý, vui lòng thử lại!"
                            });
                        })
                        .finally(() => {
                            // Kết thúc quá trình xử lý
                            setTimeout(() => {
                                setAddingInCart(false);
                            }, 1000);
                        });
                }
            }).catch((error) => {
                console.error("Error fetching cart items:", error);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Có lỗi trong quá trình kiểm tra giỏ hàng, vui lòng thử lại!"
                });
            });
        } else {
            setTabError(true);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Vui lòng chọn kích thước sản phẩm trước khi đặt hàng!"
            });
        }
    };


    const handleQuantityChange = (value) => {
        setProductQuantity(value); // Cập nhật số lượng
    };
   

    return (
        <>
            <section className="productDetails section">
                <div className='container'>
                    <div className='row'>
                        <div className='productZoom col-md-5 pl-5'>
                            <ProductZoom images={productData?.images} discount={productData?.discount} />
                        </div>


                        <div className='col-md-7 pl-5 pr-5'>
                            <h1 className='hd text-text-capitalize'>{productData?.name}</h1>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'>
                                    <div className='d-flex align-items-center'>
                                        <span className=' mr-2' > Thương hiệu :</span>
                                        <span>{productData?.brand}</span>
                                    </div>
                                </li>
                                <li className='list-inline-item'>
                                    <div className='d-flex align-items-center'>
                                        <Rating className='read-only' value={parseInt(productData?.rating)} precision={0.5} readOnly size="small" />
                                        <span className='text-light cursor ml-2'>1 đánh giá</span>
                                    </div>
                                </li>
                            </ul>

                            <div class='d-flex info mb-4'>
                                <span class='oldPrice'>{productData?.oldPrice}Đ</span>
                                <span class='netPrice text-danger ml-2'>{productData?.price}Đ</span>
                            </div>

                            <span className='badge badge-success'>Còn hàng</span>

                            <p className='mt-3'>{productData?.description}</p>

                            {
                                sizes?.length !== 0 &&
                                <div className='productSize d-flex align-items-center' >
                                    <span>Size: </span>
                                    <ul className={`list list-inline mb-0 pl-4 ${tabError === true && 'error'}`}>
                                        {
                                            sizes?.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'>
                                                        <a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }


                            <div className='d-flex align-items-center mt-4 '>
                                {/* <QuantityBox quantity={quantity} selectedItem={selectedItem}/> */}
                                <QuantityBox
                                    initialQuantity={productQuantity} // Giá trị số lượng ban đầu
                                    onQuantityChange={handleQuantityChange} // Callback khi số lượng thay đổi
                                />
                                <Button className='btn-blue btn-lg btn-big btn-round ml-4' onClick={addtoCart}>
                                    <IoCart /> &nbsp; {addingInCart === true ? "Đang thêm..." : "Thêm vào giỏ hàng"
                                    }
                                </Button>

                                <Tooltip title="Add to Wishlist" placement="top">
                                    <Button className='btn-blue btn-lg btn-big btn-circle ml-2'>
                                        <FaRegHeart />
                                    </Button>
                                </Tooltip>


                            </div>

                        </div>
                    </div>

                    <br />

                    <div className='card mt-5 p-5 detailsPageTabs'>
                        <div className='customTabs'>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'>
                                    <Button className={` ${activeTabs === 0 && 'active'}`}
                                        onClick={() => { setActiveTabs(0) }}>
                                        Mô tả sản phẩm
                                    </Button>
                                </li>
                                {/* <li className='list-inline-item'>
                                    <Button className={` ${activeTabs === 1 && 'active'}`}
                                        onClick={() => { setActiveTabs(1) }}>
                                        Thông tin chi tiết
                                    </Button>
                                </li> */}
                                <li className='list-inline-item'>
                                    <Button className={` ${activeTabs === 2 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(2)

                                        }}>
                                        Đánh giá
                                    </Button>
                                </li>

                            </ul>

                            <br />

                            {
                                activeTabs === 0 &&
                                <div className='tabContent'>
                                    <p>{productData?.description}</p>
                                </div>
                            }

                            {
                                activeTabs === 1 &&
                                <div className='tabContent'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr class='stand-up'>
                                                    <th>Stand up</th>
                                                    <td>
                                                        <p>35 x 24 x 37-45(fgkjn)</p>
                                                    </td>
                                                </tr>
                                                <tr class='folded-wo-wheels'>
                                                    <th>Folded (w/o wheels)</th>
                                                    <td>
                                                        <p>32 x 18 x 16.5H</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }

                            {
                                activeTabs === 2 &&

                                <div className="tabContent">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3 className="reviews-title">Câu hỏi và đánh giá của khách hàng</h3>

                                            {/* Lặp qua các bình luận */}
                                            {reviewData?.length !== 0 && reviewData?.reverse().map((item, index) => (
                                                <div className="card review-card" key={index}>
                                                    <div className="review-card-body">
                                                        <div className="review-header d-flex align-items-center">
                                                            <h5 className="customer-name">{item?.customerName}</h5>
                                                            <div className="ml-auto">
                                                                <Rating name="half-rating-read" value={item?.customerRating} precision={0.5} readOnly size="small" />
                                                            </div>
                                                        </div>
                                                        <h6 className="review-date">{new Date(item?.dateCreated).toLocaleString()}</h6>
                                                        <p className="review-text">{item?.review}</p>
                                                    </div>

                                                    {/* Hiển thị phần phản hồi từ admin nếu có */}
                                                    {item?.replies?.length > 0 && (
                                                        <div className="review-replies">
                                                            <h6 className="replies-title">Phản hồi từ Admin:</h6>
                                                            {item.replies.map((reply, replyIndex) => (
                                                                <div key={replyIndex} className="reply-item">
                                                                    <div className="admin-name">
                                                                        <strong>{reply.responderName}</strong>
                                                                    </div>
                                                                    <p className="reply-text">{reply.reply}</p>
                                                                    <span className="reply-time">{new Date(reply.timestamp).toLocaleString()}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Form thêm đánh giá */}
                                            <form className="review-form" onSubmit={addReview}>
                                                <h4 className="form-title">Viết đánh giá</h4>
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Viết đánh giá của bạn..."
                                                        name="review"
                                                        onChange={onChangeInput}
                                                        value={reviews.review}
                                                    ></textarea>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <Rating name="rating" value={rating} precision={0.5} onChange={onChangeRating} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-lg btn-block">
                                                    {isLoading ? <CircularProgress color="inherit" className="ml-3 loader" /> : 'Thêm đánh giá'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }

                        </div>
                    </div>

                    <br />

                    <RelatedProducts title="sản phẩm liên quan " data={relatedProductData} />
                    {/* {
                    recentlyViewed?.length!==0 &&
                    <RelatedProducts title="sản phẩm đã xem gần đây" itemView={"recentlyViewed"} data={recentlyViewed}/>
                } */}

                </div>
            </section>
        </>
    )
}

export default ProductDetails