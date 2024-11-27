import React, { useRef, useState } from 'react'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductZoom = () => {

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
        <div className='productZoom  mb-3 position-relative'>
            <div className='badge badge-primary'>23%</div>
            <Swiper
                slidesPerView={1}
                spaceBetween={1}
                navigation={false}
                slidesPerGroup={1}
                modules={[Navigation]}
                className="zoomSliderBig"
                ref={zoomSliderBig}
            >
                <SwiperSlide>
                    <div className='item'>
                        <InnerImageZoom
                            zoomType="hover" zoomScale={1}
                            // src={`$imgUrl?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                            src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='item'>
                        <InnerImageZoom
                            zoomType="hover" zoomScale={1}
                            // src={`$imgUrl?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                            src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='item'>
                        <InnerImageZoom
                            zoomType="hover" zoomScale={1}
                            // src={`$imgUrl?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                            src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='item'>
                        <InnerImageZoom
                            zoomType="hover" zoomScale={1}
                            // src={`$imgUrl?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                            src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" />
                    </div>
                </SwiperSlide>
                
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
            <SwiperSlide>
                <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                    <img  src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" 
                    className='w-100' onClick={() => goto(0)}/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                    <img  src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" 
                    className='w-100' onClick={() => goto(1)}/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                    <img  src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" 
                    className='w-100' onClick={() => goto(2)}/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                    <img  src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/05/abec4fd34ab3098de98428fc9705077e.webp" 
                    className='w-100' onClick={() => goto(3)}/>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default ProductZoom