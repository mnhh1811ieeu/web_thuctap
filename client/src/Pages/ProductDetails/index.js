import { Button, Rating } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import ProductZoom from '../../Components/ProductZoom/ProductZoom'
import QuantityBox from '../../Components/QuantityBox/QuantityBox'
import { IoCart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import RelatedProducts from './RelatedProducts/RelatedProducts';

import { useParams } from 'react-router-dom';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';

const ProductDetails = () => {

    const [activeTabs, setActiveTabs] = useState(0);
    const [activeSize, setActiveSize] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({});
    const [productData, setProductData] = useState();

    const {id} = useParams();

    const context = useContext(MyContext);
    
    const isActive = (index) => {
        setActiveSize(index);
    }

    useEffect(() => {
        window.scrollTo(0,0);
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res);
        })
    }, []);

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
    
        const cartFields = {}; // Khởi tạo đối tượng cartFields
        cartFields.productTitle = productData?.name || "No title";
        cartFields.images = productData?.images?.[0] || "No image";
        cartFields.rating = productData?.rating || 0;
        cartFields.price = productData?.price || 0;
        cartFields.quantity = productQuantity || 1; // Đảm bảo không bị 0
        cartFields.subTotal = parseInt(productData?.price * productQuantity); // Tính tổng
        cartFields.productId = productData?.id || "No ID";
        cartFields.userId = user.userId;
    
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

                        <div class='d-flex info mb-4'>
                            <span class='oldPrice'>{productData?.oldPrice}</span>
                            <span class='netPrice text-danger ml-2'>{productData?.price}</span>
                        </div>

                        <span className='badge badge-success'>IN STOCK</span>

                        <p className='mt-3'>{productData?.description}</p>

                        {
                            productData?.productSIZE?.length!==0 &&
                            <div className='productSize d-flex align-items-center' >
                               <span>Size: </span>
                               <ul className='list list-inline mb-0 pl-4'>
                                {
                                    productData?.productSIZE?.map((item, index) => {
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
                                    <FaRegHeart/>
                                </Button>
                            </Tooltip>

                        
                        </div>
                        
                    </div>
                </div>

                <br/>

                <div className='card mt-5 p-5 detailsPageTabs'>
                    <div className='customTabs'>
                        <ul className='list list-inline'>
                            <li className='list-inline-item'>
                                <Button className={ ` ${activeTabs === 0 && 'active'}`}
                                 onClick={ () => {setActiveTabs(0)}}> 
                                    Decription
                                </Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={ ` ${activeTabs === 1 && 'active'}`}
                                 onClick={ () => {setActiveTabs(1)}}> 
                                    Additional info
                                </Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={ ` ${activeTabs === 2 && 'active'}`}
                                 onClick={ () => {
                                    setActiveTabs(2)
                                    
                                }}> 
                                    Reviews (3)
                                </Button>
                            </li>

                        </ul>

                        <br/>

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
                                        <h3>Customers questions & answers</h3>
                                        <br/>


                                        <br className='res-hide'/>
                                        <br className='res-hide'/>

                                        <div className='card p-4 reviewsCard flex-row'>
                                            <div className='image'>
                                                <div className='rounded-circle'>
                                                    <img src='' />
                                                </div>
                                                <span className='text-g d-block text-center font-weight-bold'>
                                                    RIku
                                                </span>
                                            </div>

                                            <div className='info pl-5'>
                                                <div className='d-flex algin-items-center w-100'>
                                                    <h5 className='text-light'> 01/03/1999</h5>
                                                    <div className='ml-auto'>
                                                        <Rating name='half-rating-read' value={4.5} precision={0.5} readOnly size='small'/>
                                                    </div>
                                                </div>
                                                <p> dwg jebibws </p>
                                            </div>
                                        </div>

                                        <br className='res-hide'/>
                                        <br className='res-hide'/>

                                        <form className='reviewForm'>

                                            <h4> Add a review</h4> <br/>
                                            <div className='form-group'>
                                                <textarea className='form-control' 
                                                    placeholder='Write a Review'
                                                    name='review'
                                                    
                                                    
                                                    >

                                                </textarea>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='form-group'>
                                                        <input type='text' 
                                                            className='form-control'
                                                            placeholder='Name'
                                                            name='userName' />
                                                    </div>
                                                </div>

                                                <div className='col-md-6'>
                                                    <div className='form-group'>
                                                        <Rating name='rating' value={4.5} precision={0.5}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr/>
                                            <div className='form-group'>
                                                <Button type='submit'className='btn-blue btn-big btn-round  btn-lg '>Submit review</Button>
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
                
                <br/>

                <RelatedProducts title="sản phẩm liên quan "/>

                <RelatedProducts title="sản phẩm đã xem gần đây"/>
                

            </div>
        </section>
    </>
  )
}

export default ProductDetails