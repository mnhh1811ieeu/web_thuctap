import React, { useContext,useState,useEffect } from 'react'
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import { MyContext } from '../../App';
import { deleteCartData, deleteData, editData, fetchDataFromApi, fetchDataFromApii } from '../../utils/api';

const Cart = () => {
  const [isLoading,setIsLoading]=useState(false);
    const [productQuantity, setProductQuantity] = useState();
    const [cartFields,setCartField] = useState({}); // Khởi tạo đối tượng cartFields
    const quantity = (val) => {
        setProductQuantity(val);
       
    }
    const context=useContext(MyContext);
    const [cartData, setCartData] =useState([]);
   
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId; // Lấy userId từ localStorage
    
        if (userId) {
          // Gửi request với userId để lọc giỏ hàng
          fetchDataFromApi(`/api/cart?userId=${userId}`).then((res) => {
            setCartData(res);
            setIsLoading(false);
            console.log(res);
          }).catch((error) => {
            setIsLoading(false);
            console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
          });
        } else {
          setIsLoading(false);
          console.log("Không tìm thấy userId trong localStorage");
        }
    }, []); // Chỉ chạy 1 lần khi component mount

    
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
            window.location.href=window.location.href
        }).catch((error) => {
            // Xử lý lỗi nếu có
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Xóa sản phẩm thất bại"
            });
        });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;

        if (userId) {
            fetchDataFromApi(`/api/order?userid=${userId}`)
                .then((orderResponse) => {
                    console.log("Danh sách đơn hàng:", orderResponse.data);
                    
                    // Lấy orderId của phần tử cuối cùng
                    const data = orderResponse.data[orderResponse.data.length - 1];
                    const orderId = data.order_receipt;
                    console.log("Order ID của phần tử cuối cùng:", orderId);
                    
                    // Gọi API để lấy giỏ hàng
                    return fetchDataFromApi(`/api/cart?userId=${userId}`).then((cartResponse) => {
                        console.log("Danh sách giỏ hàng:", cartResponse);
                        
                        // So sánh _id của các sản phẩm trong cart và order
                        const cartProductIds = cartResponse.map((cartItem) => cartItem._id);
                        const orderProductIds = data.products.map((product) => product._id);

                        // Kiểm tra hai mảng phải giống nhau hoàn toàn (bao gồm cả thứ tự)
                        const areArraysEqual = (array1, array2) => {
                            if (array1.length !== array2.length) return false; // Kiểm tra độ dài
                            return array1.every((value, index) => value === array2[index]); // So sánh từng phần tử
                        };
        
                        const isMatching = areArraysEqual(orderProductIds, cartProductIds);
        
                        if (isMatching) {
        
                            // Kiểm tra trạng thái giao dịch
                            return fetchDataFromApii("/api/payment/transaction-status", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ orderId }),
                            });
                        } else {
                            throw new Error("Không khớp sản phẩm giữa cart và order.");
                        }
                    });
                })
                .then((paymentResponse) => {
                    console.log("Trạng thái giao dịch:", paymentResponse);
        
                    // Kiểm tra nếu giao dịch thành công
                    if (paymentResponse.message === 'Thành công.' && paymentResponse.resultCode === 0) {
                        return deleteCartData(`/api/cart?userId=${userId}`)
                    } else {
                        console.log("Giao dịch không thành công.");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi trong quá trình xử lý:", error);
                });
        }
        
        
    }, []);

    
    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Cart</h2>
                    <p>Có <b className='text-red'>{cartData?.length}</b> sản phẩm trong giỏ hàng của bạn</p>
                    <div className='row'>
                        <div className="col-md-9 pr-5">

                            <div className="table-responsive" >
                                <table className='table' padding="10px">
                                    <thead>
                                        <tr>
                                            <th width="40% ">Sản phẩm </th>
                                            <th width="17% ">Giá sản phẩm</th>
                                            <th width="15% ">Số lượng</th>
                                            <th width="18% ">Tổng đơn</th>
                                            <th width="10% ">Xóa</th>
                                        </tr>
                                    </thead>
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
                                </table>
                                
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