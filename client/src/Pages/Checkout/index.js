import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import {  fetchDataFromApi, postData, postDataUser } from '../../utils/api';
import { MyContext } from '../../App';

// import { User } from '../../../../sever/models/user';

const Checkout = () => {

  const [formFields, setFormFields] = useState({
    fullName: "",
    //country: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    //city: "",
   // state: "",
    zipCode: "",
    phoneNumber: "",
    email: ""
  })

  const [cartData, setCartData] = useState([]);
  // useEffect(() => {
  //   fetchDataFromApi(`/api/cart`).then((res) => {
  //     setCartData(res);
  //   })
  // }, [])
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage
    const userId = user ? user.userId : null; // Lấy userId từ thông tin user

    if (userId) {
      // Gọi API với userId nếu có
      fetchDataFromApi(`/api/cart?userId=${userId}`)
        .then((res) => {
          setCartData(res);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy giỏ hàng:", error);
        });
    } else {
      // Nếu không có userId, có thể xử lý trường hợp giỏ hàng trống hoặc không làm gì
      setCartData([]);
    }
  }, []); // Chạy 1 lần khi component được mount

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value
    }))
  }

  const context = useContext(MyContext);
  

// const checkout = async (e) => {
//   e.preventDefault();

//   // Validate form fields
//   for (const [key, value] of Object.entries(formFields)) {
//     if (!value) {
//       context.setAlertBox({
//         open: true,
//         error: true,
//         msg: `Please fill ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
//       });
//       return;
//     }
//   }

//   // Lấy thông tin người dùng từ localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) {
//     context.setAlertBox({
//       open: true,
//       error: true,
//       msg: 'User not found. Please log in again.',
//     });
//     return;
//   }

//   // Tính tổng số tiền từ giỏ hàng
//   const totalAmount =
//     cartData?.length !== 0 &&
//     cartData
//       .map((item) => parseInt(item.price) * item.quantity)
//       .reduce((total, value) => total + value, 0);

//   // Kiểm tra xem tổng số tiền có hợp lệ không
//   if (!totalAmount || totalAmount <= 0) {
//     context.setAlertBox({
//       open: true,
//       error: true,
//       msg: 'Total amount is not valid.',
//     });
//     return;
//   }

//   // Thông tin địa chỉ
//   const addressInfo = {
//     name: formFields.fullName,
//     phoneNumber: formFields.phoneNumber,
//     address: `${formFields.streetAddressLine1} ${formFields.streetAddressLine2}`,
//     pincode: formFields.zipCode,
//     email: user.email, // Lấy email từ thông tin người dùng
//   };

//   try {
//     const payload = {
//       ...addressInfo,
//       amount: totalAmount,
//       order_receipt: `order_rcptid_${formFields.fullName}`, // Thêm order_receipt với thông tin tạm thời
//       userid: user.userId, // Lấy userId từ thông tin người dùng
//       products: cartData, // Giỏ hàng
//     };

//     console.log("Payload being sent:", payload); // Log payload trước khi gửi

//     // Gọi API backend để tạo thanh toán MoMo
//     const response = await postDataUser('/api/payment', payload);
//     // postData(`/api/order`, payload); // Bỏ qua gọi API tạo đơn hàng trước

//     console.log("MoMo API response:", response); // Log phản hồi từ API MoMo

//     // Kiểm tra nếu phản hồi chứa orderId từ MoMo
//     if (response && response.orderId) {
//       // Cập nhật lại order_receipt với orderId từ MoMo
//       const updatedPayload = {
//         ...payload,
//         order_receipt: response.orderId, // Dùng orderId của MoMo
//       };

//       console.log("Updated Payload with MoMo orderId:", updatedPayload);

//       // Lưu updatedPayload vào MongoDB (không gọi lại API MoMo)
//       await postData(`/api/order`, updatedPayload); // Gọi API lưu đơn hàng với orderId

//       console.log("Redirecting to MoMo:", response.shortLink); // Log shortLink
//       window.location.href = response.shortLink; // Chuyển hướng đến MoMo
//     } else {
//       console.error("Failed to create payment. Response doesn't contain orderId");
//       context.setAlertBox({
//         open: true,
//         error: true,
//         msg: 'Failed to create payment. Please try again.',
//       });
//     }
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     context.setAlertBox({
//       open: true,
//       error: true,
//       msg: 'An error occurred during checkout. Please try again.',
//     });
//   }
// };
const checkout = async (e) => {
  e.preventDefault();

  // Kiểm tra các trường form
  for (const [key, value] of Object.entries(formFields)) {
    if (!value) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: `Vui lòng điền vào ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
      });
      return;
    }
  }

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    context.setAlertBox({
      open: true,
      error: true,
      msg: 'Người dùng không tìm thấy. Vui lòng đăng nhập lại.',
    });
    return;
  }

  // Tính tổng số tiền từ giỏ hàng
  const totalAmount = cartData?.length !== 0 &&
    cartData.map((item) => parseInt(item.price) * item.quantity)
      .reduce((total, value) => total + value, 0);

  // Kiểm tra xem tổng số tiền có hợp lệ không
  if (!totalAmount || totalAmount <= 0) {
    context.setAlertBox({
      open: true,
      error: true,
      msg: 'Tổng số tiền không hợp lệ.',
    });
    return;
  }

  // Thông tin địa chỉ
  const addressInfo = {
    name: formFields.fullName,
    phoneNumber: formFields.phoneNumber,
    address: `${formFields.streetAddressLine1} ${formFields.streetAddressLine2}`,
    pincode: formFields.zipCode,
    email: user.email,
  };

  try {
    const payload = {
      ...addressInfo,
      amount: totalAmount,
      order_receipt: `order_rcptid_${formFields.fullName}`, // Thêm order_receipt
      userid: user.userId,
      products: cartData, // Giỏ hàng
    };

    console.log("Payload being sent:", payload);

    // Gọi API backend để tạo thanh toán MoMo
    const response = await postDataUser('/api/payment', payload);

    console.log("Phản hồi từ MoMo API:", response);

    if (response && response.orderId) {
      const updatedPayload = {
        ...payload,
        order_receipt: response.orderId, // Dùng orderId của MoMo
      };

      console.log("Payload đã được cập nhật với orderId của MoMo:", updatedPayload);

      // Lưu updatedPayload vào MongoDB (không gọi lại API MoMo)
      await postData(`/api/order`, updatedPayload); // Gọi API lưu đơn hàng với orderId

      console.log("Chuyển hướng đến MoMo:", response.shortLink); // Log shortLink
      window.location.href = response.shortLink; // Chuyển hướng đến MoMo

      // Không xóa giỏ hàng ở đây, chỉ xóa sau khi nhận phản hồi từ MoMo
    } else {
      console.error("Không thể tạo thanh toán. Phản hồi không chứa orderId");
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Không thể tạo thanh toán. Vui lòng thử lại.',
      });
    }
  } catch (error) {
    console.error('Lỗi trong quá trình thanh toán:', error);
    context.setAlertBox({
      open: true,
      error: true,
      msg: 'Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.',
    });
  }
};


return (
    <section className='section'>
      <div className='container'>
        <form className='checkoutForm' onSubmit={checkout}>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='hd'>Thông tin giao hàng</h2>

              <div className='row mt-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                  <h6>Họ và tên</h6>
                    <TextField label="Điền họ và tên" variant="outlined" className='w-100' name='fullName' onChange={onChangeInput} />
                  </div>
                </div>

                {/* <div className='col-md-6'>
                  <div className='form-group'>
                    <TextField label="Country" variant="outlined" className='w-100' name='country' onChange={onChangeInput} />
                  </div>
                </div> */}

                {/* <div className='col-md-4'>
                  <div className='form-group'>
                  <TextField  label="Full name" variant="outlined" size='small' />
                  </div>
                </div> */}
              </div>

              <h6>Địa chỉ</h6>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <TextField label="Số nhà và tên đường" variant="outlined" className='w-100' name='streetAddressLine1' onChange={onChangeInput} />
                  </div>
                  <div className='form-group'>
                    <TextField label="Quận, huyện, thành phố, tỉnh" variant="outlined" className='w-100' name='streetAddressLine2' onChange={onChangeInput} />
                  </div>
                </div>
              </div>

              {/* <h6>Town/ City</h6>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <TextField label="City" variant="outlined" className='w-100' name='city' onChange={onChangeInput} />
                  </div>
                </div>
              </div> */}

              {/* <h6>State/ Country</h6>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <TextField label="State" variant="outlined" className='w-100' name='state' onChange={onChangeInput} />
                  </div>
                </div>
              </div> */}

              <h6>MÃ</h6>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <TextField label="ZIP Code" variant="outlined" className='w-100' name='zipCode' onChange={onChangeInput} />
                  </div>
                </div>
              </div>

              <div className='row'>
            
                <div className='col-md-6'>
                  <div className='form-group'>
                  <h6>Số điện thoại</h6>
                    <TextField label="Số điện thoại" variant="outlined" className='w-100' name='phoneNumber' onChange={onChangeInput} />
                  </div>
                </div>
                
                <div className='col-md-6'>
                  <div className='form-group'>
                  <h6>Email</h6>
                    <TextField label="Email" variant="outlined" className='w-100' name='email' onChange={onChangeInput} />
                  </div>
                </div>
              </div>


            </div>

            <div className='col-md-4'>
              <div className='card orderInfo'>
                <h4 className='hd'>Đơn hàng của bạn</h4>
                <div className='table-responsive mt-3'>
                  <table className='table table-borderless'>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartData?.length !== 0 && cartData?.map((item, index) => {
                          return (
                            <tr>
                              <td>{item?.productTitle?.substr(0, 50) + '...'}<b>x {item?.quantity}</b></td>
                              <td>{item?.price}VNĐ</td>
                            </tr>
                          )
                        })


                      }

                      <tr>
                        <td>Tổng số tiền</td>
                        <td>
                          {
                            cartData.length !== 0 && cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0)
                          }
                          VNĐ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Button type='submit' className="btn-blue bg-red btn-lg btn-big  ml-3"><CiShoppingCart />Thanh toán</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Checkout;