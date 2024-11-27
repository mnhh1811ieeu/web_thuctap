import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [value, setValue] = useState([100, 60000]);
  const [ value2, setValue2] =useState(0);
  return (
    <>
    <div className='sidebar'>
      
        <div className='filterBox'>
            <h6>PRODUCT CATEGORIES</h6>

            <div className='scroll'>
              <ul>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="Men"  />
                </li>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="Women" />
                </li>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="Beauty"  />
                </li>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="Women" />
                </li>
              </ul>
            </div>
        </div>


        <div className='filterBox'>
          <h6>Filter By Price</h6>


          <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5} />

          <div className='d-flex pt-2 pb-2 priceRange'>
            <span>
              From: <strong className='text-dark'>Rs: {value[0]}</strong> 
            </span>
            <span className='ml-auto'>
              From: <strong className='text-dark'>Rs: {value[1]}</strong></span>
          </div>


        </div>

        <div className='filterBox'>
            <h6>PRODUCT STATUS</h6>

            <div className='scroll'>
              <ul>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="In stock"  />
                </li>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="On sale" />
                </li>
                
              </ul>
            </div>
        </div>

        <div className='filterBox'>
            <h6>BRANDS</h6>

            <div className='scroll'>
              <ul>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="Frito lay"  />
                </li>
                <li>
                  <FormControlLabel className='w-100' control={<Checkbox/>} label="Nespresso" />
                </li>
                
              </ul>
            </div>
        </div>

        <Link to="#"><img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/465592933_855295973482198_183696684565547478_n.jpg?stp=dst-jpg_s600x600&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEGvQVw7lpVuMeXvYmbH_24MHWbYMlMuycwdZtgyUy7J4uslENyXIG9yGfC7PjxeENDYJSQZacfoOfnlSbl0mlm&_nc_ohc=dJBPWRvxPL8Q7kNvgEvPXMh&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=ATIX_wZPfFC6qGTFhx_B6gS&oh=00_AYDWgDSXtmPXjfJw3DWxIANapbTg4bX0ab8TSw-TxwQ9BA&oe=673406FC" 
        className='w-100'/></Link>
      
    </div>
    </>
  )
}

export default Sidebar