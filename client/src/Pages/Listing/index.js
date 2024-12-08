import React, { useEffect, useState } from 'react'
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
import { useParams } from "react-router-dom"
import { fetchDataFromApi } from '../../utils/api';

const Listing = () => {

  const [productView, setProductView] = useState('four');
  const [productData, setProductData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {name} = useParams();

  useEffect( () => {
     fetchDataFromApi(`/api/products?catName=${name}`).then( (res)=> {
      setProductData(res.products)
     })
  }, [name])

  const filterData = (name) =>{
    fetchDataFromApi(`/api/products?catName=${name}`).then( (res)=> {
      setProductData(res.products)
    })
  }

  const filterByPrice = (price, catName) =>{
    fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&catName=${catName}`).then( (res)=> {
      setProductData(res.products)
      console.log(res)
    })
  }

  const filterByRating = (rating, catName) => {
    fetchDataFromApi(`/api/products?rating=${rating}&catName=${catName}`).then( (res)=> {
      setProductData(res.products)
    })
  }

  return (
    <>
        <section className='product_Listing_Page'>
            <div className='container'>
                <div className='productListing d-flex'>
                    <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating}/>

                    <div className='content_right'>
                      <div style={{ width: "940px",height: '280px',  display: 'flex', gap: '10px'}}>
                        <img src="https://bazaarvietnam.vn/wp-content/uploads/2024/03/kim-ji-won-2-1.jpg" 
                        className="w-50" style={{ borderRadius: '10px', objectFit: 'cover'}}/>
                        <img src="https://bazaarvietnam.vn/wp-content/uploads/2024/10/bazaarvietnam-yoona-girls-generation-duoc-cong-bo-la-dai-su-thuong-hieu-moi-cua-valentino-thum.jpg" 
                        className="w-50" style={{ borderRadius: '10px', objectFit: 'cover'}}/>
                      </div>


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
                        {
                          productData?.map( (item, index) => {
                            return(
                              <ProductItem key={index} itemView={productView} item={item}/>
                            
                            )
                          })
                        }
                        
                        
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