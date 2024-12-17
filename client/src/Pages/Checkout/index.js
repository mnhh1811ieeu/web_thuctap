import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import { deleteData, editData, fetchDataFromApi, postData, postDataUser } from '../../utils/api';
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
  useEffect(() => {
    fetchDataFromApi(`/api/cart`).then((res) => {
      setCartData(res);
    })
  }, [])

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value
    }))
  }

  const context = useContext(MyContext);
  
  
//   const checkout = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     for (const [key, value] of Object.entries(formFields)) {
//         if (!value) {
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: `Please fill ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`
//             });
//             return;
//         }
//     }

//     // Calculate total amount from cart
//     const totalAmount = cartData?.length !== 0 && cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0);

//     const addressInfo = {
//         name: formFields.fullName,
//         phoneNumber: formFields.phoneNumber,
//         address: `${formFields.streetAddressLine1} ${formFields.streetAddressLine2}`,
//         pincode: formFields.zipCode,
//         email: formFields.email,
//     };

//     try {
//         const payload = {
//             ...addressInfo,
//             amount: totalAmount,
//             order_receipt: `order_rcptid_${formFields.fullName}`,
//         };

//         // Call backend API to create MoMo payment
//         const response = await postData('/api/payment', payload);

//         if (response.payUrl) {
//             window.location.href = response.payUrl; // Redirect to MoMo payment page
//         } else {
//             console.error('Failed to create payment:', response);
//         }
//     } catch (error) {
//         console.error('Error during checkout:', error);
//     }
// };

//22
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
//   // chỗ nàyyynàyyy
// const user=JSON.parse(localStorage.getItem("user"));
//   // Calculate total amount from cart
//   const totalAmount =
//     cartData?.length !== 0 &&
//     cartData
//       .map((item) => parseInt(item.price) * item.quantity)
//       .reduce((total, value) => total + value, 0);

//   const addressInfo = {
//     name: formFields.fullName,
//     phoneNumber: formFields.phoneNumber,
//     address: `${formFields.streetAddressLine1} ${formFields.streetAddressLine2}`,
//     pincode: formFields.zipCode,
//     //đâyđây
//     //email: formFields.email,
//     email:user.email,
    
//   };

//   try {
//     const payload = {
//       ...addressInfo,
//       amount: totalAmount,
//       order_receipt: `order_rcptid_${formFields.fullName}`,
//       //đâyđây
//       userid: user.userId,
//       products:cartData
//     };

//     console.log("Payload being sent:", payload); // Log payload trước khi gửi

//     // Call backend API to create MoMo payment
//     const response = await postDataUser('/api/payment', payload);

//     console.log("MoMo API response:", response); // Log phản hồi từ API MoMo

//     // Kiểm tra nếu phản hồi chứa shortLink và chuyển hướng đến trang thanh toán của MoMo
//     if (response && response.shortLink) {
//       console.log("Redirecting to MoMo:", response.shortLink); // Log shortLink
//       //window.location.href = response.shortLink; // Chuyển hướng đến MoMo
//     } else {
//       console.error("Failed to create payment. Response doesn't contain shortLink");
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

  // Validate form fields
  for (const [key, value] of Object.entries(formFields)) {
    if (!value) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: `Please fill ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
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
      msg: 'User not found. Please log in again.',
    });
    return;
  }

  // Tính tổng số tiền từ giỏ hàng
  const totalAmount =
    cartData?.length !== 0 &&
    cartData
      .map((item) => parseInt(item.price) * item.quantity)
      .reduce((total, value) => total + value, 0);

  // Kiểm tra xem tổng số tiền có hợp lệ không
  if (!totalAmount || totalAmount <= 0) {
    context.setAlertBox({
      open: true,
      error: true,
      msg: 'Total amount is not valid.',
    });
    return;
  }

  // Thông tin địa chỉ
  const addressInfo = {
    name: formFields.fullName,
    phoneNumber: formFields.phoneNumber,
    address: `${formFields.streetAddressLine1} ${formFields.streetAddressLine2}`,
    pincode: formFields.zipCode,
    email: user.email, // Lấy email từ thông tin người dùng
  };

  try {
    const payload = {
      ...addressInfo,
      amount: totalAmount,
      order_receipt: `order_rcptid_${formFields.fullName}`,
      userid: user.userId, // Lấy userId từ thông tin người dùng
      products: cartData, // Giỏ hàng
    };

    console.log("Payload being sent:", payload); // Log payload trước khi gửi

    // Gọi API backend để tạo thanh toán MoMo
    const response = await postDataUser('/api/payment', payload);
    postData(`/api/order`, payload);

    console.log("MoMo API response:", response); // Log phản hồi từ API MoMo

    // Kiểm tra nếu phản hồi chứa shortLink và chuyển hướng đến trang thanh toán của MoMo
    if (response && response.shortLink) {
      console.log("Redirecting to MoMo:", response.shortLink); // Log shortLink
      //window.location.href = response.shortLink; // Chuyển hướng đến MoMo
    } else {
      console.error("Failed to create payment. Response doesn't contain shortLink");
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Failed to create payment. Please try again.',
      });
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    context.setAlertBox({
      open: true,
      error: true,
      msg: 'An error occurred during checkout. Please try again.',
    });
  }
};



  return (
    <section className='section'>
      <div className='container'>
        <form className='checkoutForm' onSubmit={checkout}>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='hd'>BILLING DETAILS</h2>

              <div className='row mt-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <TextField label="Full name" variant="outlined" className='w-100' name='fullName' onChange={onChangeInput} />
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

              <h6>Street address</h6>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <TextField label="House number and street name" variant="outlined" className='w-100' name='streetAddressLine1' onChange={onChangeInput} />
                  </div>
                  <div className='form-group'>
                    <TextField label="Aparterment, suite, unit ,etc" variant="outlined" className='w-100' name='streetAddressLine2' onChange={onChangeInput} />
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

              <h6>Postcode/ Zip</h6>

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
                    <TextField label="Phone Number" variant="outlined" className='w-100' name='phoneNumber' onChange={onChangeInput} />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <TextField label="Email Address" variant="outlined" className='w-100' name='email' onChange={onChangeInput} />
                  </div>
                </div>
              </div>


            </div>

            <div className='col-md-4'>
              <div className='card orderInfo'>
                <h4 className='hd'>YOUR ORDER</h4>
                <div className='table-responsive mt-3'>
                  <table className='table table-borderless'>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Subtotal</th>
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
                        <td>Subtotal</td>
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