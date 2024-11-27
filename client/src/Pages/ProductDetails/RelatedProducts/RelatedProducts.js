import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
//import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
//import { TfiAngleDoubleRight } from "react-icons/tfi";
import ProductItem from '../../../Components/ProductItem/ProductItem';

const RelatedProducts = (props) => {
  return (
    <>
        <hr/>
        <div className='d-flex align-items-center mt-3'>
            <div className='info w-75'>
                <h3 className='mb-0 hd'>{props.title}</h3>
            </div>
        </div>

        <hr/>
        
        <div className='product_row w-100 mt-3'>
        <Swiper
                slidesPerView={5}
                spaceBetween={0}
                navigation={true}
                slidesPerGroup={1}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>                  
            </Swiper>
        </div>
    </>
  )
}

export default RelatedProducts