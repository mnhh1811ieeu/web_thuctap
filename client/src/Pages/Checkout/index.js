import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";

import { MyContext } from '../../App';
import { useAsyncError } from 'react-router-dom';

const Checkout = ()=> {

  const [country, setCountry] = useState([]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };


  const context = useContext(MyContext);

  

  return(
    <section className='section'>
      <div className='container'>
        <form className='checkoutForm'>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='hd'>BILLING DETAILS</h2>

              <div className='row mt-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                  <TextField  label="Full name" variant="outlined" className='w-100'  />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                      value={country}
                      label="Country"
                      onChange={handleChangeCountry}
                    >
                    {
                      context.provinceList?.length!==0 && context.provinceList?.map((item, index) => {
                        return(
                          <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                        )
                      })
                      
                    }

                      <MenuItem value={10}>Ten</MenuItem>
                    </Select>
                  </FormControl>
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
                    <TextField  label="House number and street name" variant="outlined" className='w-100'  />
                    </div>
                    <div className='form-group'>
                    <TextField  label="Aparterment, suite, unit ,etc" variant="outlined" className='w-100'  />
                    </div>
                  </div>
              </div>

              <h6>Town/ City</h6>
              
              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                    <TextField  label="City" variant="outlined" className='w-100'  />
                    </div>
                  </div>
              </div>

              <h6>State/ Country</h6>
              
              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                    <TextField  label="State" variant="outlined" className='w-100'  />
                    </div>
                  </div>
              </div>

              <h6>Postcode/ Zip</h6>
              
              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                    <TextField  label="ZIP Code" variant="outlined" className='w-100'  />
                    </div>
                  </div>
              </div>

              <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <TextField  label="Phone Number" variant="outlined" className='w-100'  />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                    <TextField  label="Email Address" variant="outlined" className='w-100'  />
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
                      <tr>
                        <td>All Natural Italian-Style Chicken Meatballs<b>x 1</b></td>

                        <td>799000 VND</td>
                      </tr>
                      <tr>
                        <td>All Natural Italian-Style Chicken Meatballs<b>x 1</b></td>

                        <td>799000 VND</td>
                      </tr>
                      <tr>
                        <td>Subtotal</td>

                        <td>799000 VND</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <Button className="btn-blue bg-red btn-lg btn-big  ml-3"><CiShoppingCart />Thanh toán</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Checkout;