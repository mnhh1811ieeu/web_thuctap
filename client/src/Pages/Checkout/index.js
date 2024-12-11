import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';

import { MyContext } from '../../App';
import { useAsyncError } from 'react-router-dom';

const Checkout = ()=> {

  const [formFields, setFormFields] = useState({
    fullName: "",
    country: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: ""
  })

  const [cartData, setCartData] =useState([]);
    useEffect(()=>{
        fetchDataFromApi(`/api/cart`).then((res)=>{
            setCartData(res);
        })
    },[])

  const onChangeInput=(e)=>{
    setFormFields(()=> ({
      ...formFields,
      [e.target.name]:e.target.value
    }))
  }

  const context = useContext(MyContext);

  const checkout = (e)=>{
    e.preventDefault();
    console.log(formFields)
    if(formFields.fullName === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill full name"
      })
      return false
    }

    if(formFields.country === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill country"
      })
      return false
    }

    if(formFields.streetAddressLine1 === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill Street address"
      })
      return false
    }

    if(formFields.streetAddressLine2 === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill Street address"
      })
      return false
    }

    if(formFields.city === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill city"
      })
      return false
    }

    if(formFields.state === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill state"
      })
      return false
    }

    if(formFields.zipcode === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill zipcode"
      })
      return false
    }

    if(formFields.phoneNumber === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill phone number"
      })
      return false
    }

    if(formFields.email === ""){
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill email address"
      })
      return false
    }

    
  }

  return(
    <section className='section'>
      <div className='container'>
        <form className='checkoutForm' onSubmit={checkout}>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='hd'>BILLING DETAILS</h2>

              <div className='row mt-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                  <TextField  label="Full name" variant="outlined" className='w-100' name='fullName' onChange={onChangeInput} />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <TextField  label="Country" variant="outlined" className='w-100' name='country' onChange={onChangeInput}  /> 
                  </div>
                </div>

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
                    <TextField  label="House number and street name" variant="outlined" className='w-100' name='streetAddressLine1' onChange={onChangeInput}  />
                    </div>
                    <div className='form-group'>
                    <TextField  label="Aparterment, suite, unit ,etc" variant="outlined" className='w-100' name='streetAddressLine2' onChange={onChangeInput}  />
                    </div>
                  </div>
              </div>

              <h6>Town/ City</h6>
              
              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                    <TextField  label="City" variant="outlined" className='w-100' name='city' onChange={onChangeInput} />
                    </div>
                  </div>
              </div>

              <h6>State/ Country</h6>
              
              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                    <TextField  label="State" variant="outlined" className='w-100' name='state' onChange={onChangeInput}  />
                    </div>
                  </div>
              </div>

              <h6>Postcode/ Zip</h6>
              
              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                    <TextField  label="ZIP Code" variant="outlined" className='w-100' name='zipCode' onChange={onChangeInput} />
                    </div>
                  </div>
              </div>

              <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <TextField  label="Phone Number" variant="outlined" className='w-100' name='phoneNumber' onChange={onChangeInput} />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <TextField  label="Email Address" variant="outlined" className='w-100' name='email' onChange={onChangeInput} />
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
                        cartData?.length!==0 && cartData?.map((item,index)=>{
                          return(
                            <tr>
                              <td>{item?.productTitle?.substr(0,50)+'...'}<b>x {item?.quantity}</b></td>
                              <td>{item?.price}VNĐ</td>
                            </tr>
                          )
                        })

                        
                      }

                      <tr>
                        <td>Subtotal</td>
                        <td>
                          {
                            cartData.length!==0 && cartData.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
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