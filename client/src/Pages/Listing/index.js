import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { IoMdMenu } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";
import ProductItem from '../../Components/ProductItem/ProductItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Listing = () => {

  const [productView, setProductView] = useState('four');

  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
        <section className='product_Listing_Page'>
            <div className='container'>
                <div className='productListing d-flex'>
                    <Sidebar/>

                    <div className='content_right'>
                      <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2024/9/26/1399809/Kim-Ji-Won-Dior-Tap--02.jpg" 
                      className="w-100" style={{ borderRadius: '10px'}}/>


                      <div className='showBy mt-3 mb-3 d-flex align-items-center'>
                        <div className='d-flex align-items-center btnWrapper' >
                            <Button className={productView === 'one'} onClick={ () => setProductView('one')}><IoMdMenu/></Button>
                            <Button className={productView === 'three' && 'act'} onClick={ () => setProductView('three')}><TbGridDots/></Button>
                            <Button className={productView === 'four' && 'act'} onClick={ () => setProductView('four')}><TfiLayoutGrid4Alt/></Button>
                        </div>
                        

                        <div className='ml-auto showByFilter'>
                          <Button  onClick={handleClick}>Show 9 <FaAngleDown/> </Button>
                          <Menu
                            className='w-100 showPerPageDropdown'
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openDropdown}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby' : 'basic-button',
                            }}
                            >
                              <MenuItem onClick={handleClose}>10</MenuItem>
                              <MenuItem onClick={handleClose}>20</MenuItem>
                              <MenuItem onClick={handleClose}>30</MenuItem>
                            </Menu>
                        </div>
                      </div>

                      <div className='productListing' >
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                        <ProductItem itemView={productView} />
                      </div>


                      <div className='d-flex mt-5 align-items-center justify-content-center'>
                        <Pagination count={10} color="primary"/>
                      </div>

                    </div>


                </div>

            </div>
        </section>
    </>
  )
}

export default Listing