import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from'@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";


import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { BsTagsFill } from "react-icons/bs";
import { IoColorPaletteSharp } from "react-icons/io5";
import { GiResize } from "react-icons/gi";
import { MdPriceCheck } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { MdPreview } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchDataFromApi } from '../../utils/api';
import { useEffect } from 'react';
import ProductZoom from '../../components/ProductZoom/ProductZoom';

import LinearProgress from '@mui/material/LinearProgress';
import UserAvatarImgComponent from '../../components/userAvatarimg';



const ProductDetails = () => {


  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false
  };

  




  const StyledBreadcrumb = styled( Chip) ( ({ theme }) => {
    const backgroundColor = 
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return{
        backgroundColor,
        height: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
    };
});

  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
          window.scrollTo(0, 0);
          fetchDataFromApi(`/api/products/${id}`).then((res) => {
              setProductData(res);
          })
          fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res => {
              setReviewData(res);
          }))
          if(productData?.productSIZE===undefined){
            
          }
      }, [id])

      const ensureArray = (data) => {
        // Nếu data là mảng, kiểm tra từng phần tử trong mảng
        if (Array.isArray(data)) {
            return data.flatMap(item => {
                // Nếu phần tử là chuỗi và có dấu phẩy, tách chuỗi ra thành mảng
                if (typeof item === 'string' && item.includes(',')) {
                    return item.split(',');  // Tách chuỗi thành mảng
                }
                return item;  // Nếu không, giữ nguyên phần tử
            });
        }
        // Nếu data là chuỗi, tách chuỗi thành mảng
        return data ? data.split(',') : [];
    };

      const sizes = ensureArray(productData?.productSIZE);
      
  return (
    <div className='right-content w-50'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
                <h5 className='mb-0 '> ProductView</h5>
                <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                    <StyledBreadcrumb 
                        components="a"
                        href="#"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />} />
                    <StyledBreadcrumb 
                        components="a"
                        label="Products"
                        href="#"
                        
                        />
                    <StyledBreadcrumb 
                        label="Product Upload"
                        
                        
                        />
                </Breadcrumbs>
            </div>

            <div className='card productDetailsSEction'>
              <div className='row'>
                <div className='col-md-5'>
                  <div className='sliderWrapper pt-3 pb-3 pl-4 pr-4'>
                      <h5 className='mb-3'>Product Gallery</h5>
                      <ProductZoom images={productData?.images} discount={productData?.discount} />
                  </div>

                </div>
                <div className='col-md-7'>
                  <div className='pt-3 pb-3 p1-4 pr-4'>
                    <h5 className='mb-3'>Product Details</h5>

                    <h3>{productData?.name}</h3>

                    <div className='productInfo mt-3'>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdBrandingWatermark/></span>
                          <span className='name'>Brand</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>{productData?.brand}</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><TbCategoryFilled/></span>
                          <span className='name'>Category</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>Man's</span> 
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                            <span className='icon'><GiResize /></span>
                            <span className='name'>Size</span>
                        </div>
                        <div className='col-sm-7'>
                            : <span>
                                {
                                  sizes?.length !== 0 &&
                                  sizes.map((item, index) => (
                                  <span key={index} className="tag">{item}</span>
                                  ))
                                }
                            </span>
                        </div>
                    </div>


                      

                      

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPreview/></span>
                          <span className='name'>Review</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>({reviewData?.length}) Review</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPublishedWithChanges/></span>
                          <span className='name'>Published</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>{productData?.dateCreated}</span>
                        </div>
                      </div>

                      
                    </div>
                  </div>
                  

                </div>
              </div>

              <div className='p-4'>
                <h4 className='mt-4 mb-3'>Product Description</h4>
                <p>{productData?.description}</p>


                <br/>


                <h4 className='mt-4 mb-4'>Customer_reviews</h4>
                <div className='reviewSection'>
                  {
                    reviewData?.length!==0 && reviewData?.map((review, index) => {
                      return(
                        <div className='reviewsRow reply'>
                          <div className='row'>
                            <div className='col-sm-7'>
                              <div className='userInfo d-flex'>
                                <UserAvatarImgComponent img = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"
                                lg = {true}/>

                                <div className='info pl-2'>
                                  <h6>{review?.customerName}</h6>
                                  <span>{review?.dateCreated}</span>
                                  <div className=''>
                                  <Rating name="read-only" value={review?.customerRating} readOnly />
                                  </div>
                                </div>
                              </div>

                              <div className='col-md-5 d-flex align-items-center'>
                                <div className='ml-auto'>
                                  <Button className='btn-blue btn-big btn-lg ml-auto'> &nbsp; Reply</Button>
                                </div>
                              </div>

                              <p className='mt-3'>{review?.review}</p>

                            </div>
                          </div>
                        </div>
                      )
                    })
                  }


                </div>

                <br/>

                <h6 className='mt-4 mb-4'>Review Reply Form</h6>

                <form className="reviewForm">
                  <textarea placeholder="write here ">

                  </textarea>

                  <Button className='btn-blue btn-big btn-lg w-100 mt-4'>Drom your relies</Button>
                </form>
              </div>
            </div>
    </div>
  )
}

export default ProductDetails