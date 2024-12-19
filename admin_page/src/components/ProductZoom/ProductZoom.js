import React, { useRef, useState } from 'react'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductZoom = (props) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    const goto = (index) => {
        setSlideIndex(index);
        zoomSlider.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }

  return (
    <div className='productZoom'>
        <div className='productZoom productZoomBig mb-3 position-relative'>
            <div className='badge badge-primary'>{props.discount}%</div>
            <Swiper
                slidesPerView={1}
                spaceBetween={1}
                navigation={false}
                slidesPerGroup={1}
                modules={[Navigation]}
                className="zoomSliderBig"
                ref={zoomSliderBig}
            >
                {
                    props?.images?.map( (img, index) => {
                        return(
                            <SwiperSlide key={index}>
                                <div className='item'>
                                    <InnerImageZoom
                                        zoomType="hover" zoomScale={1}
                                        src={img} />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                
                
                
            </Swiper>
        </div>


        <Swiper
            slidesPerView={4}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="zoomSlider"
            ref={zoomSlider}
        >
            {
                props?.images?.map( (img, index) => {
                    return(
                        <SwiperSlide>
                            <div className={`item ${slideIndex === index && 'item_active'}`} key={index}>
                                <img  src={img} 
                                className='w-100' onClick={() => goto(index)}/>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
            
           
        </Swiper>
    </div>
  )
}

export default ProductZoom