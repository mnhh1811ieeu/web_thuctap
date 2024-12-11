import React, { useContext,useState,useEffect } from 'react'

import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import QuantityBox from '../../Components/QuantityBox/QuantityBox';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';

const Cart = () => {
  const [isLoading,setIsLoading]=useState(false);
    const [productQuantity, setProductQuantity] = useState();
    const [cartFields,setCartField] = useState({}); // Khởi tạo đối tượng cartFields
    const quantity = (val) => {
        setProductQuantity(val);
       
    }
    const context=useContext(MyContext);
    const [cartData, setCartData] =useState([]);
    useEffect(()=>{
        fetchDataFromApi(`/api/cart`).then((res)=>{
            setCartData(res);
            console.log(res)
        })
    },[]);
   
    
    const selectedItem = (item, quantityVal) => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        
        // Kiểm tra và sử dụng đúng trường `productId` nếu có
        setCartField({
            productTitle: item?.productTitle,
            images: item?.images[0], // Nếu images là mảng
            rating: item?.rating,
            price: item?.price,
            quantity: quantityVal,
            subTotal: parseInt(item?.price * quantityVal),
            productId: item?.productId,  // Sử dụng đúng trường productId
            userId: user.userId
        });
        editData(`/api/cart/${item?._id}`, cartFields).then((res) => {
           setTimeout(()=>{
            setIsLoading(false);
           },1000);
           fetchDataFromApi(`/api/cart`).then((res)=>{
            setCartData(res);
            console.log(res)
        })
         })
    };
    useEffect(() => {
        console.log("Updated cartFields:", cartFields);
      }, [cartFields]); // Theo dõi sự thay đổi của cartFields
    
      const removeItem = (id) => {
        deleteData(`/api/cart/${id}`).then((res) => {
            // Hiển thị thông báo sản phẩm đã bị xóa
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Sản phẩm đã được xóa khỏi giỏ hàng"
            });
    
            // Tải lại trang sau khi xóa thành công
            window.location.reload();  // Tải lại trang
        }).catch((error) => {
            // Xử lý lỗi nếu có
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Xóa sản phẩm thất bại"
            });
        });
    }
    
    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Cart</h2>
                    <p>Có <b className='text-red'>{cartData?.length}</b> sản phẩm trong giỏ hàng của bạn</p>
                    <div className='row'>
                        <div className="col-md-9 pr-5">

                            <div className="table-responsive" >
                                <table className='table' >
                                    <thead>
                                        <tr>
                                            <th width="40% ">Sản phẩm </th>
                                            <th width="17% ">Giá sản phẩm</th>
                                            <th width="15% ">Số lượng</th>
                                            <th width="18% ">Tổng đơn</th>
                                            <th width="10% ">Xóa</th>
                                        </tr>
                                    </thead>
                                </table>
                                <tbody>
                                    {
                                        cartData?.length!==0 && cartData?.map((item,index)=>{
                                       return(
                                        <tr>
                                        <td width="40%">
                                            
                                            <Link to={`/product/${item?.productId}`} >
                                                <div className="d-flex align-items-center CartItemimgWrapper">
                                                    <div className='imgWrapper'>
                                                        <img src={item?.images} alt={item?.productTitle}
                                                            className='w-100'></img>
                                                    </div>
                                                    <div className='info px-3'>
                                                        <h6>{item?.productTitle?.substr(0,50)+'...'}</h6>

                                                        <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td width="17%">
                                           {item?.price} 
                                        </td >
                                        <td width="15% ">
                                        <span>{item?.quantity}</span> {/* Chỉ hiển thị số lượng mà không cho chỉnh sửa */}
                                        </td>
                                        <td width="18% ">
                                            {item?.subTotal} VND
                                        </td>
                                        <td width="10% ">
                                            <span className='remove' onClick={()=>removeItem(item?._id)}>
                                                <IoMdClose />
                                            </span>
                                        </td>
                                    </tr>
                                       )
                                        
                                        })
                                    }
                                   
                                
                                </tbody>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='card border p-3 cartDetails'>
                                <h4>Tổng giỏ hàng</h4>
                                <div className='d-flex align-items-center mb-3 '>

                                    <span>
                                        Tổng đơn hàng
                                    </span>
                                    <span className='ml-auto text-red font-weight-bold'>{
                                        cartData.length!==0 && cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
                                        } VND
                                    </span>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <span>
                                        Phí vận chuyển
                                    </span>
                                    <span className='ml-auto  '> <b>0 VND </b></span>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <span>
                                        Áp dụng cho
                                    </span>
                                    <span className='ml-auto '><b>Bắc Giang </b></span>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <span>
                                        Tổng hóa đơn
                                    </span>
                                    <span className='ml-auto text-red font-weight-bold'>{
                                        cartData.length!==0 && cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
                                        } VND</span>
                                </div>
                                <br />
                                <Link to="/checkout">
                                <Button className="btn-blue bg-red btn-lg btn-big  ml-3"><CiShoppingCart />Thanh toán</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isLoading===true && <div className='loading'></div>  }
         
        </>
    )
}

export default Cart