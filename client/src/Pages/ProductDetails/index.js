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
import { fetchDataFromApi, postData } from '../../utils/api';

const ProductDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setIsRating] = useState(1);
    const [activeTabs, setActiveTabs] = useState(0);
    const [activeSize, setActiveSize] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({});
    const [productData, setProductData] = useState();
    const { id } = useParams();
    const [reviewData, setReviewData] = useState([]);


    const context = useContext(MyContext);
    
    const isActive = (index) => {
        setActiveSize(index);
    }
    const [reviews, setReviews] = useState({
        productId: "",
        customerName: "",
        customerId: "",
        review: "",
        customerRating: 0
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res)
            console.log(res)
        })
        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res => {
            setReviewData(res)
        }))
    }, [id])

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
    const sizes = ensureArray( productData?.productSIZE);
    const addReview = (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        reviews.customerName = user?.name;
        reviews.customerId = user?.userId;
        reviews.productId = id;

        setIsLoading(true);
        postData("/api/productReviews/add", reviews).then((res) => {
            setIsLoading(false);
            reviews.customerRating=1;
            setReviews({
                review: "",
                customerRating: 1
            })
            fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
                setReviewData(res)
            })
        })
    }
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

    let [cartFields, setCarFields] = useState([]);
    let [productQuantity, setProductQuantity] = useState();

    const quantity=(val)=> {
        setProductQuantity(val)
    }

    // const addtoCart= (data)=>{
        
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     console.log(user);
    
    
    //     cartFields.productTitle = productData?.name
    //     cartFields.images= productData?.images[0]
    //     cartFields.rating = productData?.rating
    //     cartFields.price = productData?.price
    //     cartFields.quantity = productQuantity
    //     cartFields.subTotal = parseInt(productData?.price * productQuantity)
    //     cartFields.productId = productData?.id
    //     cartFields.userId = user?.userId

    
    //     context.addtoCart(cartFields);
    // }
    const addtoCart = (data) => {
        // Lấy dữ liệu user từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            console.error("User not found in localStorage");
            return;
        }
        console.log("User:", user);
    
        // Kiểm tra dữ liệu sản phẩm và số lượng
        console.log("productData:", productData);
        console.log("productQuantity:", productQuantity);
    
        const cartFields = {}; // Khởi tạo đối tượng cartFields
        cartFields.productTitle = productData?.name || "No title";
        cartFields.images = productData?.images?.[0] || "No image";
        cartFields.rating = productData?.rating || 0;
        cartFields.price = productData?.price || 0;
        cartFields.quantity = productQuantity || 1; // Đảm bảo không bị 0
        cartFields.subTotal = parseInt(cartFields.price * cartFields.quantity, 10); // Tính tổng
        cartFields.productId = productData?.id || "No ID";
        cartFields.userId = user.userId;
    
        console.log("Cart Fields:", cartFields);
    
        // Thêm sản phẩm vào giỏ
        context.addtoCart(cartFields);
    };
    

  return (
    <>
        <section className="productDetails section">
            <div className='container'>
                <div className='row'>
                    <div className='productDZoom col-md-5 pl-5'>
                        <ProductZoom images={productData?.images} discount={productData?.discount}/>
                    </div>
                    

                    <div className='col-md-7 pl-5 pr-5'>
                        <h2 className='hd text-text-capitalize'>{productData?.name}</h2>
                        <ul className='list list-inline'>
                            <li className='list-inline-item'>
                                <div className='d-flex align-items-center'>
                                    <span className=' mr-2' >Brands: </span>
                                    <span>{productData?.brand}</span>
                                </div>
                            </li>
                            <li className='list-inline-item'>
                                <div className='d-flex align-items-center'>
                                    <Rating className='read-only' value={parseInt(productData?.rating)} precision={0.5} readOnly size="small" />
                                    <span className='text-light cursor ml-2'>1 Review</span>
                                </div>
                            </li>
                        </ul>

                        <div className='d-flex info mb-4'>
                            <span className='oldPrice'>{productData?.oldPrice}</span>
                            <span className='netPrice text-danger ml-2'>{productData?.price}</span>
                        </div>

                            <span className='badge badge-success'>IN STOCK</span>

                        <p className='mt-3'>{productData?.description}</p>

                        {
                            sizes?.length!==0 &&
                            <div className='productSize d-flex align-items-center' >
                               <span>Size: </span>
                               <ul className='list list-inline mb-0 pl-4'>
                                {
                                    sizes?.map((item, index) => {
                                        return(
                                            <li className='list-inline-item'>
                                                <a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={()=> isActive(index)}>{item}</a>
                                            </li>
                                        )
                                    })
                                }
                               </ul>
                            </div>
                        }

                        
                        <div className='d-flex align-items-center mt-4 '>
                            <QuantityBox quantity = {quantity}/>
                            <Button className='btn-blue btn-lg btn-big btn-round ml-4' onClick={()=>addtoCart(productData)}>
                                <IoCart/> &nbsp; Thêm vào giỏ hàng 
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
                                        Decription
                                    </Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={` ${activeTabs === 1 && 'active'}`}
                                        onClick={() => { setActiveTabs(1) }}>
                                        Additional info
                                    </Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={` ${activeTabs === 2 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(2)

                                        }}>
                                        Reviews (3)
                                    </Button>
                                </li>

                            </ul>

                            <br />

                        {
                            activeTabs === 0 &&
                            <div className='tabContent'>
                                {productData?.description}
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

                                <div className='tabContent'>
                                    <div className='row'>
                                        <div className='col-md-8' >
                                            <h3>Câu hỏi của khách hàng và đánh giá</h3>
                                            <br />

                                            {
                                                reviewData?.length !== 0 && reviewData?.slice(0)?.reverse()?.map((item, index) => {
                                                    return (
                                                        <div className='card p-4 reviewsCard flex-row' key={index}>
                                                            <div className='info'>
                                                                <div className='d-flex algin-items-center w-100'>
                                                                    <h5>{item?.customerName}</h5>

                                                                    <div className='ml-auto'>
                                                                        <Rating name='half-rating-read' value={item?.customerRating} precision={0.5} readOnly size='small' />
                                                                    </div>

                                                                </div>
                                                                <h6 className='text-light'> {item?.dateCreated}</h6>
                                                                <p> {item?.review} </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            <br className='res-hide' />




                                            <br className='res-hide' />

                                            <form className='reviewForm' onSubmit={addReview}>

                                                <h4> Đánh giá</h4> <br />
                                                <div className='form-group'>
                                                    <textarea className='form-control'
                                                        placeholder='Viết đánh giá'
                                                        name='review'
                                                        onChange={onChangeInput}
                                                        value={reviews.review}
                                                    >

                                                    </textarea>
                                                </div>

                                                <div className='row'>
                                                    {/* <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <input type='text'
                                                                className='form-control'
                                                                placeholder='Name'
                                                                name='customerName' onChange={onChangeInput} />
                                                        </div>
                                                    </div> */}

                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <Rating name='rating' value={rating} precision={0.5} onChange={onChangeRating} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr />
                                                <div className='form-group'>
                                                    <Button type='submit' className='btn-blue btn-big btn-round  btn-lg '>{isLoading === true ? <CircularProgress color="inherit"
                                                        className="ml-3 loader" /> : 'Thêm đánh giá'}</Button>
                                                </div>

                                            </form>
                                        </div>



                                        {/* <div className='col-md-4 pl-5 reviewBox'>
                                        

                                    </div>   */}
                                    </div>
                                </div>
                            }




                        </div>
                    </div>

                    <br />
                     
                <RelatedProducts title="sản phẩm liên quan "/>

                <RelatedProducts title="sản phẩm đã xem gần đây"/>
                

                </div>
            </section>
        </>
    )
}

export default ProductDetails